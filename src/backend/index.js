const path = require('path');
const express = require('express');
const moment = require('moment');
const app = express();

const { measureUnits, foods, recipes, diets, dietDiary, dietSchedule } = require('./mock-database');
const blankDiet = { name: '', meals: [] };

//===== Functions //
const mealOutputNormalize = (meal, currentDiet, includeStatus = false) => {
    if (!meal.name && currentDiet) {
        const currentMeal = currentDiet.meals.find(cm => cm.id === meal.id);
        meal.name = currentMeal.name;
        meal.time = currentMeal.time;
    }

    meal.recipes.forEach(recipe => mealItemOutputNormalize(recipe, recipes, includeStatus));
    meal.foods.forEach(food => mealItemOutputNormalize(food, foods, includeStatus));
};

const mealItemOutputNormalize = (item, itemList, includeStatus = false) => {
    item.name = itemList.find(r => r.id === item.id).name;
    item.amountText = `${ item.amount } ${ measureUnits[item.measureUnit] }`;

    if (!item.amount) {
        item.amountText = `${ measureUnits[item.measureUnit] }`;
    }

    if (includeStatus) {
        item.checked = item.checked || false;
    }
};

const mealInputNormalize = (meal, keepStatus) => {
    delete meal.name;
    delete meal.time;

    meal.recipes.forEach(recipe => mealItemInputNormalize(recipe, keepStatus));
    meal.foods.forEach(food => mealItemInputNormalize(food, keepStatus));
};

const mealItemInputNormalize = (item, keepStatus = false) => {
    delete item.name;
    delete item.amountText;

    if (!keepStatus) {
        delete item.checked;
    }
};

const ingredientInputNormalize = (ingredient) => ({
    id: Number(ingredient.id),
    name: ingredient.name,
    measureUnit: Number(ingredient.measureUnit),
    amount: Number(ingredient.amount),
    amountText: ingredient.amountText
});

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../../public')));

app.get('/api/food', (req, res) => {
    res.json(foods);
});

app.post('/api/food', (req, res) => {
    const newFood = {
        id: foods[foods.length - 1].id + 1,
        name: req.body.name,
        measureUnits: req.body.measureUnits
    };

    foods.push(newFood);

    res.json(foods);
});

app.put('/api/food', (req, res) => {
    const food = {
        id: req.body.id,
        name: req.body.name,
        measureUnits: req.body.measureUnits
    };

    const index = foods.findIndex(f => f.id === food.id);
    foods[index] = food;

    res.json(foods);
});

app.delete('/api/food/:id', (req, res) => {
    const id = req.params.id;
    const index = foods.findIndex(food => food.id === id);

    foods.splice(index, 1);

    res.json(foods);
});

app.get('/api/recipe', (req, res) => {
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ing => mealItemOutputNormalize(ing, foods));
    });

    res.json(recipes);
});

app.post('/api/recipe', (req, res) => {
    const recipe = {
        id: recipes[recipes.length - 1].id + 1,
        name: req.body.name,
        ingredients: req.body.ingredients.map(ingredientInputNormalize)
    };

    recipes.push(recipe);

    res.json(recipes);
});

app.put('/api/recipe', (req, res) => {
    const recipe = {
        id: req.body.id,
        name: req.body.name,
        ingredients: req.body.ingredients.map(ingredientInputNormalize)
    };

    const index = recipes.findIndex(r => r.id === recipe.id);
    recipes[index] = recipe;

    res.json(recipes);
});

app.delete('/api/recipe/:id', (req, res) => {
    const id = req.params.id;
    const index = recipes.findIndex(recipe => recipe.id === id);

    recipes.splice(index, 1);

    res.json(recipes);
});

app.get('/api/diet/:id', (req, res) => {
    const id = Number(req.params.id);
    const diet = diets.find(d => d.id === id) || blankDiet;

    if (diet && diet.meals) {
        diet.meals.forEach(meal => mealOutputNormalize(meal));
    }

    res.json(diet);
});

app.post('/api/diet', (req, res) => {
    const id = diets[diets.length - 1].id + 1;

    const diet = {
        id: id,
        name: req.body.name || `Dieta ${ id }`,
        meals: req.body.meals
    };

    diets.push(diet);

    res.json(diet);
});

app.put('/api/diet', (req, res) => {
    const diet = {
        id: req.body.id,
        name: req.body.name,
        meals: req.body.meals
    };

    const index = diets.findIndex(d => d.id === diet.id);
    diets[index] = diet;

    res.json(diet);
});

app.get('/api/diet', (req, res) => {
    res.json(diets);
});

app.post('/api/meal', (req, res) => {
    const dietId = req.body.dietId;

    const diet = diets.find(d => d.id === dietId);
    const meals = diet.meals;
    const id = meals.length ? meals[meals.length - 1].id + 1 : 1;

    const meal = {
        id: id,
        name: req.body.meal.name,
        time: req.body.meal.time,
        recipes: req.body.meal.recipes,
        foods: req.body.meal.foods
    };

    meals.push(meal);

    res.json(diet);
});

app.put('/api/meal', (req, res) => {
    const dietId = req.body.dietId;
    const mealId = req.body.meal.id;

    const diet = diets.find(d => d.id === dietId);
    const idx = diet.meals.findIndex(m => m.id === mealId);

    const meal = {
        id: req.body.meal.id,
        name: req.body.meal.name,
        time: req.body.meal.time,
        recipes: req.body.meal.recipes,
        foods: req.body.meal.foods
    };

    diet.meals[idx] = meal;

    res.json(diet);
});

app.get('/api/diary/:date', (req, res) => {
    const date = req.params.date;
    const weekDay = moment(date).isoWeekday();
    const savedDiet = dietDiary.find(ds => ds.date === date);
    let dietOfDay = diets.find(d => d.id === dietSchedule[weekDay]);
    const diet = savedDiet ? savedDiet.diet : dietOfDay;

    if (savedDiet && (!dietOfDay || dietOfDay.id !== savedDiet.diet.id)) {
        dietOfDay = diets.find(d => d.id === savedDiet.diet.id);
    }

    const diary = {
        date: date
    };

    if (diet) {
        diet.meals.forEach(meal => mealOutputNormalize(meal, dietOfDay, true));

        diary.diet = {
            id: diet.id,
            meals: diet.meals
        }
    }


    res.json(diary);
});

app.post('/api/diary', (req, res) => {
    const date = req.body.date;
    const idx = dietDiary.findIndex(ds => ds.date === date);

    const diary = {
        date: req.body.date,
        diet: {
            id: req.body.diet.id,
            meals: req.body.diet.meals
        }
    };

    diary.diet.meals.forEach(meal => mealInputNormalize(meal, true));

    if (idx !== -1) {
        dietDiary[idx] = diary;
    } else {
        dietDiary.push(diary);
    }

    res.json(diary);
});

app.get('/api/schedule', (req, res) => {
    res.json(dietSchedule);
});

app.put('/api/schedule/:day', (req, res) => {
    dietSchedule[req.params.day] = req.body.dietId;
    res.json(dietSchedule);
});

app.use('/api/*', (req, res) => {
    res.sendStatus(500).end();
});

app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening on port 3000');
});