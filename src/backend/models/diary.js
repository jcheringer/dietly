const mongoose = require('mongoose');
const Diet = require('./diet');
const Food = require('./food');
const Recipe = require('./recipe');
const User = require('./user');

const diarySchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: User
    },
    date: String,
    diet: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Diet
        },
        meals: [
            {
                _id: mongoose.Schema.Types.ObjectId,
                recipes: [{
                    _id: false,
                    recipe: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: Recipe
                    },
                    measureUnit: Number,
                    amount: Number,
                    checked: Boolean
                }],
                foods: [{
                    _id: false,
                    food: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: Food
                    },
                    measureUnit: Number,
                    amount: Number,
                    checked: Boolean
                }]
            }
        ]
    }
}, { collection: 'diary' });

const Diary = mongoose.model('Diary', diarySchema);

module.exports = Diary;