const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Connection = require('./Models/connection');

// Récupération des crédentials de la bdd
dotenv.config();
let db_user = process.env.DB_USER;
let db_password = process.env.DB_PASSWORD;

// Création de l'application Express
const app = express();
app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    const newConnection = new Connection({ page: 'index.html' });
    newConnection.save()
        .then(() => res.status(200).send('Connexion enregistrée'))
        .catch((error) => res.status(500).send('Erreur lors de l\'enregistrement de la connexion'));
});