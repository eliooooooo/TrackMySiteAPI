// models/connection.js
const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    page: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Connection', connectionSchema);