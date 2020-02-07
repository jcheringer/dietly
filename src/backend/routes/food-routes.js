const router = require('express').Router();

const foodService = require('../service/food-service');

router.get('/', async (req, res, next) => {
    try {
        res.json(await foodService.list());
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newFood = {
            name: req.body.name,
            measureUnits: req.body.measureUnits
        };

        await foodService.insert(newFood);
        res.json(await foodService.list());
    } catch (e) {
        next(e);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const food = {
            name: req.body.name,
            measureUnits: req.body.measureUnits
        };

        await foodService.update(req.body._id, food);
        res.json(await foodService.list());
    } catch (e) {
        next(e)
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await foodService.delete(req.params.id);
        res.json(await foodService.list());
    } catch (e) {
        next(e);
    }
});

module.exports = router;