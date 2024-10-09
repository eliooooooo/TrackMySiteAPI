const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Connection = require('./Models/connection');

// Récupération des crédentials de la bdd
dotenv.config();
let db_user = process.env.DB_USER;
let db_password = process.env.DB_PASSWORD;

const app = express();

// Utiliser le middleware CORS
app.use(cors());

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Connexion à la base de données MongoDB
mongoose.connect(`mongodb+srv://${db_user}:${db_password}@mongotable.rbtmi.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=MongoTable`)
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

// Route pour enregistrer la connexion
app.post('/log-connection', (req, res) => {
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

app.delete('/log-delete/:id', async (req, res) => {
    const id = req.params.id;
    await Connection.findOneAndDelete(id)
    .then(() => res.status(200).send('Connexion supprimée'))
    .catch((error) => res.status(500).send(`Erreur lors de la suppression de la connexion : ${error}`))
})