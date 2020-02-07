const router = require('express').Router();

const dietScheduleService = require('../service/diet-schedule-service');

router.get('/', async (req, res, next) => {
    try {
        res.json(await dietScheduleService.get());
    } catch (e) {
        next(e);
    }
});

router.put('/:day', async (req, res, next) => {
    try {
        const dietSchedule = await dietScheduleService.update(req.params.day, req.body.dietId);
        res.json(dietSchedule);
    } catch (e) {
        next(e);
    }
});

module.exports = router;