const router = require('express').Router();

const middleware = require('./middlewares');
const dietScheduleService = require('../service/diet-schedule-service');

router.get('/', middleware.validateUser, async (req, res, next) => {
    try {
        const userId = res.locals.userData.id;
        res.json(await dietScheduleService.get(userId));
    } catch (e) {
        next(e);
    }
});

router.put('/:day', middleware.validateUser, async (req, res, next) => {
    try {
        const userId = res.locals.userData.id;
        const dietSchedule = await dietScheduleService.update(req.params.day, req.body.dietId, userId);

        res.json(dietSchedule);
    } catch (e) {
        next(e);
    }
});

module.exports = router;