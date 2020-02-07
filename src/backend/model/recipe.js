const mongoose = require('mongoose');
const Food = require('./food');
const User = require('./user');

const recipeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: User
    },
    name: String,
    ingredients: [
        {
            _id: false,
            food: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Food
            },
            measureUnit: Number,
            amount: Number
        }
    ]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;