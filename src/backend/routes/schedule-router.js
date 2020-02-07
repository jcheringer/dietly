const router = require('express').Router();

const middleware = require('./middlewares');
const dietScheduleService = require('../service/diet-schedule-service');

router.get('/', middleware.validateUser, async (req, res, next) => {
    try {
        res.json(await dietScheduleService.get());
    } catch (e) {
        next(e);
    }
});

router.put('/:day', middleware.validateUser, async (req, res, next) => {
    try {
        const dietSchedule = await dietScheduleService.update(req.params.day, req.body.dietId);
        res.json(dietSchedule);
    } catch (e) {
        next(e);
    }
});

module.exports = router;