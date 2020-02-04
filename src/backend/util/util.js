const { MEASURE_UNITS } = require('./constants');


module.exports = {
    mealOutputNormalize: (meal, currentDiet, includeStatus = false) => {
        if (!meal.name && currentDiet) {
            const currentMeal = currentDiet.meals.find(cm => cm._id === meal._id);
            meal.name = currentMeal.name;
            meal.time = currentMeal.time;
        }

        meal.recipes = meal.recipes.map(recipe => mealItemOutputNormalize(recipe, recipes, includeStatus));
        meal.foods = meal.foods.map(food => mealItemOutputNormalize(food, foods, includeStatus));
    },

    mealItemOutputNormalize: (item, itemList, includeStatus = false) => {
        let amountText = `${ item.amount } ${ MEASURE_UNITS[item.measureUnit] }`;

        if (!item.amount) {
            amountText = `${ MEASURE_UNITS[item.measureUnit] }`;
        }

        const normalizedItem = {
            _id: item.food._id,
            name: item.food.name,
            measureUnit: item.measureUnit,
            amount: item.amount,
            amountText: amountText
        };

        if (includeStatus) {
            normalizedItem.checked = item.checked || false;
        }

        return normalizedItem;
    },

    mealInputNormalize: (meal, keepStatus) => {
        return {
            id: meal._id,
            recipes: meal.recipes.map(recipe => mealItemInputNormalize(recipe, keepStatus)),
            foods: meal.foods.map(food => mealItemInputNormalize(food, keepStatus))
        }
    },

    mealItemInputNormalize: (item, keepStatus = false) => {
        const normalizedItem = {
            food: item._id,
            measureUnit: item.measureUnit,
            amount: item.amount
        };

        if (keepStatus) {
            normalizedItem.checked = item.checked;
        }

        return normalizedItem;
    },

    ingredientInputNormalize: (ingredient) => ({
        id: ingredient._id,
        name: ingredient.name,
        measureUnit: Number(ingredient.measureUnit),
        amount: Number(ingredient.amount),
        amountText: ingredient.amountText
    })
};