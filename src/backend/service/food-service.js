const Food = require('../model/food');

module.exports = {
    async list(userId) {
        return Food.find({ user: userId }).lean().exec();
    },
    async insert(data) {
        return new Food(data).save();
    },
    async update(id, data) {
        return Food.findByIdAndUpdate(id, data, { new: true }).exec();
    },
    async delete(id) {
        return Food.findByIdAndDelete(id).exec();
    }
};