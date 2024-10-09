const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    page: {
        type: String,
    },
    source: {
        type: String
    },
    campaign: {
        type: String
    },
    content: {
        type: String
    },
    term: {
        type: String
    },
    medium: {
        type: String
    },
    user: {
        language: { type: String },
        location: {
            latitude: { type: String },
            longitude: { type: String }
        },
        platform: { type: String },
        userAgent: { type: String }
    }
});

module.exports = mongoose.model('Connection', connectionSchema);