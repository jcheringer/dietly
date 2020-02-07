const mongoose = require('mongoose');
const Food = require('../model/food');
const Recipe = require('../model/recipe');
const User = require('./user');

const dietSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: User
    },
    name: String,
    meals: [
        {
            name: String,
            time: String,
            recipes: [{
                _id: false,
                recipe: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: Recipe
                },
                measureUnit: Number,
                amount: Number
            }],
            foods: [{
                _id: false,
                food: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: Food
                },
                measureUnit: Number,
                amount: Number
            }]
        }
    ]
});

const Diet = mongoose.model('Diet', dietSchema);

module.exports = Diet;