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
    async get(userId, hideId = true) {
        const query = DietSchedule.findOne({ user: userId });

        if (hideId) {
            query.select('-_id -__v -user')
        }

        const dietSchedule = await query.lean().exec();

        if (!dietSchedule) {
            return { ...blankSchedule };
        }

        return dietSchedule;
    },
    async update(day, dietId, userId) {
        const dietSchedule = await dietScheduleService.get(userId, false);
        dietSchedule[day] = dietId;

        if (!dietSchedule._id) {
            dietSchedule.user = userId;
            await new DietSchedule(dietSchedule).save();
        } else {
            const condition = { _id: dietSchedule._id, user: userId };
            await DietSchedule.findOneAndUpdate(condition, dietSchedule, { new: true }).exec();
        }

        return await dietScheduleService.get(userId);
    }
};

module.exports = dietScheduleService;