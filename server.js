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
    if (!apiKey) {
        return res.status(401).send('Clé API manquante');
    }

    try {
        const key = await ApiKey.findOne({ key: apiKey });
        if (!key) {
            return res.status(401).send('Clé API invalide');
        }
        next();
    } catch (error) {
        return res.status(500).send(`Erreur lors de la vérification de la clé API : ${error}`);
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