const { MEASURE_UNITS, MEAL_TYPE } = require('../../constants');

const utils = {
    mealOutputNormalize: (meal, currentDiet, foods, recipes, includeStatus = false) => {
        if (!meal.name && currentDiet) {
            const currentMeal = currentDiet.meals.find(cm => cm._id.toString() === meal._id.toString());
            meal.name = currentMeal.name;
            meal.time = currentMeal.time;
        }

        meal.recipes = meal.recipes.map(recipe => utils.mealItemOutputNormalize(recipe, recipes, includeStatus));
        meal.foods = meal.foods.map(food => utils.mealItemOutputNormalize(food, foods, includeStatus));
    },

    mealItemOutputNormalize: (item, itemList, includeStatus = false) => {
        let amountText = `${ item.amount } ${ MEASURE_UNITS[item.measureUnit] }`;

        if (!item.amount) {
            amountText = `${ MEASURE_UNITS[item.measureUnit] }`;
        }

        const normalizedItem = {
            measureUnit: item.measureUnit,
            amount: item.amount,
            amountText: amountText
        };

        if (item.food) {
            normalizedItem._id = item.food._id;
            normalizedItem.name = item.food.name;
        } else if (item.recipe) {
            normalizedItem._id = item.recipe._id;
            normalizedItem.name = item.recipe.name;
        }

        if (includeStatus) {
            normalizedItem.checked = item.checked || false;
        }

        return normalizedItem;
    },

    mealInputNormalize: (meal, keepNameAndTime = true, keepStatus = false) => {
        const normalizedMeal = {
            _id: meal._id,
            recipes: meal.recipes.map(recipe => utils.mealItemInputNormalize(recipe, keepStatus, MEAL_TYPE.RECIPE)),
            foods: meal.foods.map(food => utils.mealItemInputNormalize(food, keepStatus, MEAL_TYPE.FOOD))
        };

        if (keepNameAndTime) {
            normalizedMeal.name = meal.name;
            normalizedMeal.time = meal.time;
        }

        return normalizedMeal;
    },

    mealItemInputNormalize: (item, keepStatus = false, type) => {
        const normalizedItem = {
            measureUnit: item.measureUnit,
            amount: item.amount
        };

        const itemType = item.type || type;

        if (itemType === MEAL_TYPE.FOOD) {
            normalizedItem.food = item._id;
        } else if (itemType === MEAL_TYPE.RECIPE) {
            normalizedItem.recipe = item._id;
        }

        if (keepStatus) {
            normalizedItem.checked = item.checked;
        }

        return normalizedItem;
    }
};

module.exports = utils;