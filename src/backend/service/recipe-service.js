const Recipe = require('../model/recipe');
const foodService = require('./food-service');

const util = require('../util/util');

module.exports = {
    async list(userId) {
        const recipes = await Recipe.find({ user: userId }).populate('ingredients.food').lean();
        const foods = await foodService.list(userId);

        recipes.forEach(recipe => {
            recipe.ingredients = recipe.ingredients.map(ing => util.mealItemOutputNormalize(ing, foods));
        });

        return recipes;
    },
    async insert(data, userId) {
        const recipe = {
            user: userId,
            name: data.name,
            ingredients: data.ingredients.map(util.mealItemInputNormalize)
        };

        return new Recipe(recipe).save();
    },
    async update(recipeId, data, userId) {
        const recipe = {
            name: data.name,
            ingredients: data.ingredients.map(util.mealItemInputNormalize)
        };

        return Recipe.findOneAndUpdate({ _id: recipeId, user: userId }, recipe, { new: true }).exec();
    },
    async delete(recipeId, userId) {
        return Recipe.findOneAndDelete({ _id: recipeId, user: userId }).exec();

    }
};