const router = require('express').Router();

const middleware = require('./middlewares');
const diaryService = require('../services/diary-service');

router.get('/:date', middleware.validateUser, async (req, res, next) => {
    try {
        const userId = res.locals.userData.id;
        const diary = await diaryService.get(req.params.date, userId);

        res.json(diary);
    } catch (e) {
        next(e);
    }
});

router.post('/', middleware.validateUser, async (req, res, next) => {
    try {
        const userId = res.locals.userData.id;
        const diary = await diaryService.update(req.body, userId);

        res.json(diary);
    } catch (e) {
        next(e);
    }
});

module.exports = router;