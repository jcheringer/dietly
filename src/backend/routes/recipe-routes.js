const router = require('express').Router();

const middleware = require('./middlewares');
const recipeService = require('../services/recipe-service');

router.get('/', middleware.validateUser, async (req, res, next) => {
    try {
        const userId = res.locals.userData.id;

        res.json(await recipeService.list(userId));
    } catch (e) {
        next(e);
    }
});

router.post('/', middleware.validateUser, async (req, res, next) => {
    try {
        const userId = res.locals.userData.id;
        await recipeService.insert(req.body, userId);

        res.json(await recipeService.list(userId));
    } catch (e) {
        next(e);
    }
});

router.put('/', middleware.validateUser, async (req, res, next) => {
    try {
        const userId = res.locals.userData.id;
        await recipeService.update(req.body._id, req.body, userId);

        res.json(await recipeService.list(userId));
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', middleware.validateUser, async (req, res, next) => {
    try {
        const userId = res.locals.userData.id;
        await recipeService.delete(req.params.id, userId);

        res.json(await recipeService.list(userId));
    } catch (e) {
        next(e);
    }
});

module.exports = router;