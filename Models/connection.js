// models/connection.js
const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    page: {
        type: String,
        required: true
    },
    source: {
        type: String
    }
});

module.exports = mongoose.model('Connection', connectionSchema);