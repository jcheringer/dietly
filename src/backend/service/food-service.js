const Food = require('../model/food');

module.exports = {
    async list(userId) {
        return Food.find({ user: userId }).lean().exec();
    },
    async insert(data, userId) {
        const food = {
            user: userId,
            name: data.name,
            measureUnits: data.measureUnits
        };

        return new Food(food).save();
    },
    async update(foodId, data, userId) {
        const food = {
            name: data.name,
            measureUnits: data.measureUnits
        };

        return Food.findOneAndUpdate({ _id: foodId, user: userId }, food, { new: true }).exec();
    },
    async delete(foodId, userId) {
        return Food.findOneAndDelete({ _id: foodId, user: userId }).exec();
    }
};