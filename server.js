const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Connection = require('./Models/connection');
const ApiKey = require('./Models/apiKey');

// Récupération des crédentials de la bdd
dotenv.config();
let db_user = process.env.DB_USER;
let db_password = process.env.DB_PASSWORD;

const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
}));

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Connexion à la base de données MongoDB
mongoose.connect(`mongodb+srv://${db_user}:${db_password}@trackmysite.jh1hp.mongodb.net/?retryWrites=true&w=majority&appName=TrackMySite`)
.then(() => {
    console.log('Connexion à la base de données réussie');
    // Démarrage du serveur
    app.listen(3000, () => {
        console.log('Serveur démarré sur le port 3000');
    });
})
.catch((error) => {
    console.error('Erreur de connexion à la base de données', error);
});

const checkApiKey = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const origin = req.headers['Origin'];
    if (!apiKey) {
        return res.status(401).send('Clé API manquante');
    } else if (!origin) {
        return res.status(401).send('Origine de la requête manquante');
    }

    try {
        const key = await ApiKey.findOne({ key: apiKey, origin: origin });
        if (!key) {
            return res.status(401).send('Clé API invalide ou origine non correspondante');
        }

        // Vérifier si l'origine utilise HTTPS et a un certificat valide
        const url = new URL(origin);
        if (url.protocol !== 'https:') {
            return res.status(401).send('Origine non sécurisée (HTTPS requis)');
        }

        https.get(origin, (response) => {
            const certificate = response.socket.getPeerCertificate();
            if (!certificate || Object.keys(certificate).length === 0) {
                return res.status(401).send('Certificat SSL invalide ou manquant');
            }
            next();
        }).on('error', (err) => {
            return res.status(401).send(`Erreur lors de la vérification du certificat SSL : ${err.message}`);
        });

    } catch (error) {
        return res.status(500).send(`Erreur lors de la vérification de la connexion : ${error}`);
    }
}

// Route pour enregistrer la connexion
app.post('/log-connection', checkApiKey, (req, res) => {
    console.log(req.body);
    const newConnection = new Connection({ 
        page: req.body.page, 
        source: req.body.source,
        campaign: req.body.campaign,
        content: req.body.content,
        term: req.body.term,
        medium: req.body.medium,
        user: req.body.user
    });
    newConnection.save()
        .then(() => res.status(200).send('Connexion enregistrée'))
        .catch((error) => res.status(500).send(`Erreur lors de l\'enregistrement de la connexion : ${error}`));
});

app.delete('/log-delete/:id', checkApiKey, async (req, res) => {
    const id = req.params.id;
    await Connection.findOneAndDelete(id)
    .then(() => res.status(200).send('Connexion supprimée'))
    .catch((error) => res.status(500).send(`Erreur lors de la suppression de la connexion : ${error}`))
})