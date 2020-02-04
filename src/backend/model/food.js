const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: String,
    measureUnits: [{
        _id: false,
        id: Number,
        multiplier: Number
    }]
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;