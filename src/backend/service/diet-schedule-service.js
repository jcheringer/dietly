const DietSchedule = require('../model/diet-schedule');

const blankSchedule = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null
};

const dietScheduleService = {
    async get(hideId = true) {
        const query = DietSchedule.findOne();

        if (hideId) {
            query.select('-_id -__v')
        }

        const dietSchedule = await query.lean().exec();

        if (!dietSchedule) {
            return blankSchedule;
        }

        return dietSchedule;
    },
    async update(day, dietId) {
        const dietSchedule = await dietScheduleService.get(false);
        dietSchedule[day] = dietId;

        if (!dietSchedule._id) {
            await new DietSchedule(dietSchedule).save();
        } else {
            await DietSchedule.findByIdAndUpdate(dietSchedule._id, dietSchedule, { new: true }).exec();
        }

        return await dietScheduleService.get();
    }
};

module.exports = dietScheduleService;