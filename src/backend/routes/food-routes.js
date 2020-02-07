const router = require('express').Router();

const foodService = require('../service/food-service');
const middleware = require('./middlewares');

router.get('/', middleware.validateUser, async (req, res, next) => {
    try {
        const userId = res.locals.userData.id;
        res.json(await foodService.list(userId));
    } catch (e) {
        next(e);
    }
});

router.post('/', middleware.validateUser, async (req, res, next) => {
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

router.put('/', middleware.validateUser, async (req, res, next) => {
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

router.delete('/:id', middleware.validateUser, async (req, res, next) => {
    try {
        await foodService.delete(req.params.id);
        res.json(await foodService.list());
    } catch (e) {
        next(e);
    }
});

module.exports = router;