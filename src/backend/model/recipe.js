const mongoose = require('mongoose');
const Food = require('./food');

const recipeSchema = new mongoose.Schema({
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