const router = require('express').Router();

const dietService = require('../service/diet-service');

router.post('/meal', async (req, res, next) => {
    try {
        const diet = await dietService.mealUpsert(req.body.dietId, null, req.body);
        res.json(diet);
    } catch (e) {
        next(e);
    }
});

router.put('/meal', async (req, res, next) => {
    try {
        const diet = await dietService.mealUpsert(req.body.dietId, req.body.meal._id, req.body);
        res.json(diet);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await dietService.get(req.params.id));
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const diet = await dietService.insert(req.body);
        res.json(diet);
    } catch (e) {
        next(e);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const diet = await dietService.update(req.body._id, req.body);
        res.json(diet);
    } catch (e) {
        next(e);
    }
});

router.get('/', async (req, res, next) => {
    try {
        res.json(await dietService.list());
    } catch (e) {
        next(e);
    }
});

module.exports = router;