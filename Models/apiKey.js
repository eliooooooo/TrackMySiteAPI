const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    }, 
    origin: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ApiKey', apiKeySchema);