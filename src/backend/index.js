const path = require('path');
const express = require('express');
const app = express();

const { measureUnits, foods, receipts, diets, dietSchedule } = require('./mock-database');

//===== Functions //
const mealNormalize = (meal, currentDiet, includeStatus = false) => {
    if (!meal.name && currentDiet) {
        const currentMeal = currentDiet.meals.find(cm => cm.id === meal.id);
        meal.name = currentMeal.name;
        meal.time = currentMeal.time;
    }

    meal.receipts.forEach(receipt => mealItemNormalize(receipt, receipts, includeStatus));
    meal.foods.forEach(food => mealItemNormalize(food, foods, includeStatus));
};

const mealItemNormalize = (item, itemList, includeStatus = false) => {
    item.name = itemList.find(r => r.id === item.id).name;
    item.amountText = `${ item.amount } ${ measureUnits[item.measureUnit] }`;

    if (!item.amount) {
        item.amountText = `${ measureUnits[item.measureUnit] }`;
    }

    if (includeStatus) {
        item.checked = item.checked || false;
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

app.get('/api/receipt', (req, res) => {
    receipts.forEach(receipt => {
        receipt.ingredients.forEach(ing => mealItemNormalize(ing, foods));
    });

    res.json(receipts);
});

app.post('/api/receipt', (req, res) => {
    const receipt = {
        id: receipts[receipts.length - 1].id + 1,
        name: req.body.name,
        ingredients: req.body.ingredients.map(ingredientInputNormalize)
    };

    receipts.push(receipt);

    res.json(receipts);
});

app.put('/api/receipt', (req, res) => {
    const receipt = {
        id: req.body.id,
        name: req.body.name,
        ingredients: req.body.ingredients.map(ingredientInputNormalize)
    };

    const index = receipts.findIndex(r => r.id === receipt.id);
    receipts[index] = receipt;

    res.json(receipts);
});

app.delete('/api/receipt/:id', (req, res) => {
    const id = req.params.id;
    const index = receipts.findIndex(receipt => receipt.id === id);

    receipts.splice(index, 1);

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

    diet.meals.forEach(meal => mealNormalize(meal, currentDiet, true));

    res.json(diet.meals);
});

app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening on port 3000');
});