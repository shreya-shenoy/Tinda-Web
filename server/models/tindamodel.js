const mongoose = require('mongoose');

// schema for the data

const tindaSchema = new mongoose.Schema({
    id: Number,
    title: String,
    image: String,
    servings: Number,
    readyInMinutes: Number,
    summary: String
});

const tindaModel = mongoose.model('tindaModel', tindaSchema);

module.exports = tindaModel;