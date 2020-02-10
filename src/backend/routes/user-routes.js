const router = require('express').Router();

const userService = require('../service/user-service');

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await userService.get(req.params.id));
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

module.exports = router;