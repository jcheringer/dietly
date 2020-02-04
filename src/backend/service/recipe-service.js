const Recipe = require('../model/recipe');
const foodService = require('./food-service');

const util = require('../util/util');

module.exports = {
    async list() {
        const recipes = await Recipe.find().populate('ingredients.food').lean();
        const foods = await foodService.list();

        recipes.forEach(recipe => {
            recipe.ingredients = recipe.ingredients.map(ing => util.mealItemOutputNormalize(ing, foods));
        });

        return recipes;
    },
    async insert(data) {
        return new Recipe(data).save();
    },
    async update(id, data) {
        return Recipe.findByIdAndUpdate(id, data, { new: true }).exec();
    },
    async delete(id) {
        return Recipe.findByIdAndDelete(id).exec();
    }
};