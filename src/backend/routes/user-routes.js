const router = require('express').Router();

const userService = require('../services/user-service');

router.post('/register', async (req, res, next) => {
    try {
        const user = await userService.register(req.body);
        res.json(user);
    } catch (e) {
        next(e);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const user = await userService.commonLogin(req.body);
        res.json(user);
    } catch (e) {
        next(e);
    }
});

router.post('/login/google', async (req, res, next) => {
    try {
        const user = await userService.googleLogin(req.body);
        res.json(user);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await userService.get(req.params.id));
    } catch (e) {
        next(e);
    }
});

module.exports = router;