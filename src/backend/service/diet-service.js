const Diet = require('../model/diet');
const util = require('../util/util');
const foodService = require('../service/food-service');
const recipeService = require('../service/recipe-service');

const blankDiet = { name: '', meals: [] };

const dietService = {
    async list(userId) {
        return Diet.find({ user: userId }).lean().exec();
    },
    async get(dietId, userId) {
        if (dietId === '0') {
            return blankDiet;
        }

        const diet = await Diet.findOne({ _id: dietId, user: userId })
            .populate('meals.foods.food meals.recipes.recipe')
            .lean()
            .exec();

        const foods = await foodService.list(userId);
        const recipes = await recipeService.list(userId);

        if (diet && diet.meals) {
            diet.meals.forEach(meal => util.mealOutputNormalize(meal, null, foods, recipes));
        }

        return diet;
    },
    async insert(data, userId) {
        const diets = await dietService.list(userId);

        const diet = {
            user: userId,
            name: data.name || `Dieta ${ diets.length + 1 }`,
            meals: data.meals
        };

        diet.meals = diet.meals.map(util.mealInputNormalize);

        const newDiet = await new Diet(diet).save();

        return dietService.get(newDiet._id, userId);
    },
    async update(dietId, data, userId) {
        const diet = {
            name: data.name,
            meals: data.meals
        };

        diet.meals = diet.meals.map((meal) => util.mealInputNormalize(meal, true));

        await Diet.findOneAndUpdate({ _id: dietId, user: userId }, diet).exec();

        return dietService.get(dietId, userId);
    },
    async delete(dietId, userId) {
        return Diet.findOneAndDelete({ _id: dietId, user: userId }).exec();
    },
    async mealUpsert(dietId, mealId, data, userId) {
        const diet = await Diet.findOne({ _id: dietId, user: userId }).lean().exec();

        const meal = {
            name: data.meal.name,
            time: data.meal.time,
            recipes: data.meal.recipes.map(util.mealItemInputNormalize),
            foods: data.meal.foods.map(util.mealItemInputNormalize)
        };

        if (mealId) {
            meal._id = mealId;
            const idx = diet.meals.findIndex(m => m._id.toString() === mealId);
            diet.meals[idx] = meal;
        } else {
            diet.meals.push(meal);
        }

        await Diet.findOneAndUpdate({ _id: dietId, user: userId }, diet).exec();

        return dietService.get(dietId, userId);
    }
};

module.exports = dietService;
