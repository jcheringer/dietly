const path = require('path');
const express = require('express');
const app = express();

const { measureUnits, foods, receipts, diets, dietSchedule } = require('./mock-database');

//===== Functions //
const mealNormalize = (meal, currentDiet) => {
    if (!meal.name && currentDiet) {
        const currentMeal = currentDiet.meals.find(cm => cm.id === meal.id);
        meal.name = currentMeal.name;
        meal.time = currentMeal.time;
    }

    meal.receipts.forEach(receipt => mealItemNormalize(receipt, receipts));
    meal.foods.forEach(food => mealItemNormalize(food, foods));
};

const mealItemNormalize = (item, itemList) => {
    item.name = itemList.find(r => r.id === item.id).name;
    item.amountText = `${ item.amount } ${ measureUnits[item.measureUnit] }`;

    if (!item.amount) {
        item.amountText = `${ measureUnits[item.measureUnit] }`;
    }

    item.checked = item.checked || false;
};

app.use(express.static(path.resolve(__dirname, '../../public')));

app.use('/api/food', (req, res) => {
    res.json(foods);
});

app.use('/api/receipt', (req, res) => {
    res.json(receipts);
});

app.use('/api/diet/:id', (req, res) => {
    const id = Number(req.params.id);
    const diet = diets.find(d => d.id === id) || {};

    if (diet && diet.meals) {
        diet.meals.forEach(meal => mealNormalize(meal));
    }

    res.json(diet);
});

app.use('/api/diet', (req, res) => {
    res.json(diets);
});

app.use('/api/diet-schedule/:date', (req, res) => {
    const date = req.params.date;
    const dietOfDay = dietSchedule.find(ds => ds.date === date);
    const currentDiet = diets.find(d => d.active);
    const diet = dietOfDay ? dietOfDay.diet : currentDiet;

    diet.meals.forEach(meal => mealNormalize(meal, currentDiet));

    res.json(diet.meals);
});

app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening on port 3000');
});