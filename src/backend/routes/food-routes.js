const router = require('express').Router();

const middleware = require('./middlewares');
const foodService = require('../services/food-service');

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
        const userId = res.locals.userData.id;
        await foodService.insert(req.body,userId);

        //TODO: Return saved resource and ajust front
        res.json(await foodService.list(userId));
    } catch (e) {
        next(e);
    }
});

router.put('/', middleware.validateUser, async (req, res, next) => {
    try {
        const userId = res.locals.userData.id;
        await foodService.update(req.body._id, req.body, userId);

        //TODO: Return updated resource and ajust front
        res.json(await foodService.list(userId));
    } catch (e) {
        next(e)
    }
});

router.delete('/:id', middleware.validateUser, async (req, res, next) => {
    try {
        const userId = res.locals.userData.id;
        await foodService.delete(req.params.id, userId);

        //TODO: Success message and ajust front
        res.json(await foodService.list(userId));
    } catch (e) {
        next(e);
    }
});

module.exports = router;