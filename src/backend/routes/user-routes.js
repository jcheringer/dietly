const router = require('express').Router();

const userService = require('../service/user-service');

router.post('/login/google', async (req, res, next) => {
    try {
        const user = await userService.googleLogin(req.body);
        res.json(user);
    } catch (e) {
        next(e);
    }
});

module.exports = router;