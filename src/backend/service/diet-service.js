const Diet = require('../model/diet');
const util = require('../util/util');
const foodService = require('../service/food-service');
const recipeService = require('../service/recipe-service');

const blankDiet = { name: '', meals: [] };

const dietService = {
    async list() {
        return Diet.find().lean().exec();
    },
    async get(id) {
        if (id === '0') {
            return blankDiet;
        }

        const diet = await Diet.findById(id).populate('meals.foods.food meals.recipes.recipe').lean().exec();
        const foods = await foodService.list();
        const recipes = await recipeService.list();

        if (diet && diet.meals) {
            diet.meals.forEach(meal => util.mealOutputNormalize(meal, null, foods, recipes));
        }

        return diet;
    },
    async insert(data) {
        const diets = await dietService.list();

        const diet = {
            name: data.name || `Dieta ${ diets.length + 1 }`,
            meals: data.meals
        };

        diet.meals = diet.meals.map(util.mealInputNormalize);

        const newDiet = await new Diet(diet).save();

        return dietService.get(newDiet._id);
    },
    async update(id, data) {
        const diet = {
            name: data.name,
            meals: data.meals
        };

        diet.meals = diet.meals.map((meal) => util.mealInputNormalize(meal, true));

        await Diet.findByIdAndUpdate(id, diet).exec();

        return dietService.get(id);
    },
    async delete(id) {
        return Diet.findByIdAndDelete(id).exec();
    },
    async mealUpsert(dietId, mealId, data) {
        const diet = await Diet.findById(dietId).lean().exec();

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

        await Diet.findByIdAndUpdate(dietId, diet).exec();

        return dietService.get(dietId);
    }
};

module.exports = dietService;
