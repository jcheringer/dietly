const router = require('express').Router();

const recipeService = require('../service/recipe-service');
const util = require('../util/util');

router.get('/', async (req, res, next) => {
    try {
        res.json(await recipeService.list());
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const recipe = {
            name: req.body.name,
            ingredients: req.body.ingredients.map(util.mealItemInputNormalize)
        };

        await recipeService.insert(recipe);
        res.json(await recipeService.list());
    } catch (e) {
        next(e);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const recipe = {
            name: req.body.name,
            ingredients: req.body.ingredients.map(util.mealItemInputNormalize)
        };

        await recipeService.update(req.body._id, recipe);
        res.json(await recipeService.list());
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await recipeService.delete(req.params.id);
        res.json(await recipeService.list());
    } catch (e) {
        next(e);
    }
});

module.exports = router;