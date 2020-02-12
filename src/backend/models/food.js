const mongoose = require('mongoose');
const User = require('./user');

const foodSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: User
    },
    name: String,
    measureUnits: [{
        _id: false,
        id: Number,
        multiplier: Number
    }]
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;