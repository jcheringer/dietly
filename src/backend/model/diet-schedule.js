const mongoose = require('mongoose');
const Diet = require('./diet');
const User = require('./user');

const dietScheduleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: User
    },
    1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Diet
    },
    2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Diet
    },
    3: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Diet
    },
    4: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Diet
    },
    5: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Diet
    },
    6: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Diet
    },
    7: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Diet
    }
}, { collection: 'diet-schedule' });

const DietSchedule = mongoose.model('DietSchedule', dietScheduleSchema);

module.exports = DietSchedule;