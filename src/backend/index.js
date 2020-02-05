const path = require('path');
const express = require('express');
const moment = require('moment');
const dotenv = require('dotenv');

const db = require('./dao');
const foodService = require('./service/food-service');
const recipeService = require('./service/recipe-service');
const dietService = require('./service/diet-service');

const util = require('./util/util');

const { measureUnits, foods, recipes, diets, dietDiary, dietSchedule } = require('./mock-database');

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

app.delete('/api/food/:id', async (req, res) => {
    await foodService.delete(req.params.id);
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

app.delete('/api/recipe/:id', async (req, res) => {
    await recipeService.delete(req.params.id);
    res.json(await recipeService.list());
});

app.get('/api/diet/:id', async (req, res) => {
    res.json(await dietService.get(req.params.id));
});

app.post('/api/diet', async (req, res) => {
    const diet = await dietService.insert(req.body);
    res.json(diet);
});

app.put('/api/diet', async (req, res) => {
    const diet = await dietService.update(req.body._id, req.body);
    res.json(diet);
});

app.get('/api/diet', async (req, res) => {
    res.json(await dietService.list());
});

app.post('/api/meal', async (req, res) => {
    const diet = await dietService.mealUpsert(req.body.dietId, null, req.body);
    res.json(diet);
});

app.put('/api/meal', async (req, res) => {
    const diet = await dietService.mealUpsert(req.body.dietId, req.body.meal._id, req.body);
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