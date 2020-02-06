const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

const db = require('./dao');
const foodService = require('./service/food-service');
const recipeService = require('./service/recipe-service');
const dietService = require('./service/diet-service');
const dietScheduleService = require('./service/diet-schedule-service');
const diaryService = require('./service/diary-service');

const util = require('./util/util');

dotenv.config({ path: path.join(__dirname, '../config/config.env') });

const app = express();

db.connect();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../../public')));

app.get('/api/food', async (req, res) => {
    res.json(await foodService.list());
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
    res.json(await recipeService.list());
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

app.get('/api/schedule', async (req, res) => {
    res.json(await dietScheduleService.get());
});

app.put('/api/schedule/:day', async (req, res) => {
    const dietSchedule = await dietScheduleService.update(req.params.day, req.body.dietId);
    res.json(dietSchedule);
});

app.get('/api/diary/:date', async (req, res) => {
    const diary = await diaryService.get(req.params.date);
    res.json(diary);
});

app.post('/api/diary', async (req, res) => {
    const diary = await diaryService.update(req.body);
    res.json(diary);
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