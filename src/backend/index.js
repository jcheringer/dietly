const path = require('path');
const express = require('express');
const app = express();

const { measureUnits, foods, receipts, diets, dietSchedule } = require('./mock-database');
const blankDiet = { name: '', meals: [] };

//===== Functions //
const mealOutputNormalize = (meal, currentDiet, includeStatus = false) => {
    if (!meal.name && currentDiet) {
        const currentMeal = currentDiet.meals.find(cm => cm.id === meal.id);
        meal.name = currentMeal.name;
        meal.time = currentMeal.time;
    }

    meal.receipts.forEach(receipt => mealItemOutputNormalize(receipt, receipts, includeStatus));
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

    meal.receipts.forEach(receipt => mealItemInputNormalize(receipt, keepStatus));
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

app.get('/api/receipt', (req, res) => {
    receipts.forEach(receipt => {
        receipt.ingredients.forEach(ing => mealItemOutputNormalize(ing, foods));
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
        receipts: req.body.meal.receipts,
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
        receipts: req.body.meal.receipts,
        foods: req.body.meal.foods
    };

    diet.meals[idx] = meal;

    res.json(diet);
});

app.get('/api/schedule/:date', (req, res) => {
    const date = req.params.date;
    const dietOfDay = dietSchedule.find(ds => ds.date === date);
    let currentDiet = diets.find(d => d.active);
    const diet = dietOfDay ? dietOfDay.diet : currentDiet;

    if (dietOfDay && currentDiet.id !== dietOfDay.diet.id) {
        currentDiet = diets.find(d => d.id === dietOfDay.diet.id);
    }

    diet.meals.forEach(meal => mealOutputNormalize(meal, currentDiet, true));

    const schedule = {
        date: date,
        diet: {
            id: diet.id,
            meals: diet.meals
        }
    };

    res.json(schedule);
});

app.post('/api/schedule', (req, res) => {
    const date = req.body.date;
    const idx = dietSchedule.findIndex(ds => ds.date === date);

    const schedule = {
        date: req.body.date,
        diet: {
            id: req.body.diet.id,
            meals: req.body.diet.meals
        }
    };

    schedule.diet.meals.forEach(meal => mealInputNormalize(meal, true));

    if (idx !== -1) {
        dietSchedule[idx] = schedule;
    } else {
        dietSchedule.push(schedule);
    }

    res.json(schedule)
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