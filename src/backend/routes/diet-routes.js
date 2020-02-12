const router = require('express').Router();

const middleware = require('./middlewares');
const dietService = require('../services/diet-service');

router.post('/meal', middleware.validateUser, async (req, res, next) => {
    try {
        const userId = res.locals.userData.id;
        const diet = await dietService.mealUpsert(req.body.dietId, null, req.body, userId);

        res.json(diet);
    } catch (e) {
        next(e);
    }
});

router.put('/meal', middleware.validateUser, async (req, res, next) => {
    try {
        const userId = res.locals.userData.id;
        const diet = await dietService.mealUpsert(req.body.dietId, req.body.meal._id, req.body, userId);

        res.json(diet);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', middleware.validateUser, async (req, res, next) => {
    try {
        const userId = res.locals.userData.id;
        res.json(await dietService.get(req.params.id, userId));
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', middleware.validateUser, async (req, res, next) => {
    try {
        const userId = res.locals.userData.id;
        await dietService.delete(req.params.id, userId);

        //TODO: Return success message and adjust front
        res.json(await dietService.list(userId));
    } catch (e) {
        next(e);
    }
});

router.post('/', middleware.validateUser, async (req, res, next) => {
    try {
        const userId = res.locals.userData.id;
        const diet = await dietService.insert(req.body, userId);

        res.json(diet);
    } catch (e) {
        next(e);
    }
});

router.put('/', middleware.validateUser, async (req, res, next) => {
    try {
        const userId = res.locals.userData.id;
        const diet = await dietService.update(req.body._id, req.body, userId);

        res.json(diet);
    } catch (e) {
        next(e);
    }
});

router.get('/', middleware.validateUser, async (req, res, next) => {
    try {
        const userId = res.locals.userData.id;

        res.json(await dietService.list(userId));
    } catch (e) {
        next(e);
    }
});

module.exports = router;