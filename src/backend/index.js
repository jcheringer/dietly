const path = require('path');
const express = require('express');
const moment = require('moment');
const dotenv = require('dotenv');

const db = require('./dao');
const foodService = require('./service/food-service');
const recipeService = require('./service/recipe-service');

const util = require('./util/util');

const { measureUnits, foods, recipes, diets, dietDiary, dietSchedule } = require('./mock-database');
const blankDiet = { name: '', meals: [] };

dotenv.config({ path: path.join(__dirname, '../config/config.env') });

const app = express();

db.connect();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../../public')));

app.get('/api/food', async (req, res) => {
    const foodList = await foodService.list();
    res.json(foodList);
});

app.post('/api/food', async (req, res) => {
    const newFood = {
        name: req.body.name,
        measureUnits: req.body.measureUnits
    };

    await foodService.insert(newFood);
    res.json(await foodService.list());
});

app.put('/api/food', async (req, res) => {
    const food = {
        name: req.body.name,
        measureUnits: req.body.measureUnits
    };

    await foodService.update(req.body._id, food);
    res.json(await foodService.list());
});

app.delete('/api/food/:_id', async (req, res) => {
    await foodService.delete(req.params._id);
    res.json(await foodService.list());
});

app.get('/api/recipe', async (req, res) => {
    const recipeList = await recipeService.list();
    res.json(recipeList);
});

app.post('/api/recipe', async (req, res) => {
    const recipe = {
        name: req.body.name,
        ingredients: req.body.ingredients.map(util.mealItemInputNormalize)
    };

    await recipeService.insert(recipe);
    res.json(await recipeService.list());
});

app.put('/api/recipe', async (req, res) => {
    const recipe = {
        name: req.body.name,
        ingredients: req.body.ingredients.map(util.mealItemInputNormalize)
    };

    await recipeService.update(req.body._id, recipe);
    res.json(await recipeService.list());
});

app.delete('/api/recipe/:_id', async (req, res) => {
    await recipeService.delete(req.params._id);
    res.json(await recipeService.list());
});

app.get('/api/diet/:id', (req, res) => {
    const id = Number(req.params.id);
    const diet = diets.find(d => d.id === id) || blankDiet;

    if (diet && diet.meals) {
        diet.meals.forEach(meal => util.mealOutputNormalize(meal));
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
        diet.meals.forEach(meal => util.mealOutputNormalize(meal, dietOfDay, true));

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

    diary.diet.meals.forEach(meal => util.mealInputNormalize(meal, true));

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