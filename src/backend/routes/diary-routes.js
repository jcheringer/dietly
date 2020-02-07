const router = require('express').Router();

const middleware = require('./middlewares');
const diaryService = require('../service/diary-service');

router.get('/:date', middleware.validateUser, async (req, res, next) => {
    try {
        const diary = await diaryService.get(req.params.date);
        res.json(diary);
    } catch (e) {
        next(e);
    }
});

router.post('/', middleware.validateUser, async (req, res, next) => {
    try {
        const diary = await diaryService.update(req.body);
        res.json(diary);
    } catch (e) {
        next(e);
    }
});

module.exports = router;