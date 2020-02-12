const moment = require('moment');

const Diary = require('../models/diary');
const dietScheduleService = require('./diet-schedule-service');
const dietService = require('./diet-service');
const foodService = require('./food-service');
const recipeService = require('./recipe-service');

const normalizer = require('../utils/normalizer');

const diaryService = {
    async get(date, userId) {
        const dietSchedule = await dietScheduleService.get(userId);
        const momentDate = moment(date);
        const dietOfDayId = dietSchedule[momentDate.isoWeekday()];

        let dietOfDay = await dietService.get(dietOfDayId, userId);
        const savedDiet = await Diary
            .findOne({ date: date, user: userId })
            .populate('diet.meals.foods.food diet.meals.recipes.recipe')
            .lean()
            .exec();

        const diet = savedDiet ? savedDiet.diet : dietOfDay;

        if (savedDiet && (!dietOfDay || dietOfDay._id.toString() !== savedDiet.diet._id.toString())) {
            dietOfDay = await dietService.get(savedDiet.diet._id, userId);
        }

        const diary = {
            date: date
        };

        if (diet) {
            if (!diet.name) {
                const foods = await foodService.list(userId);
                const recipes = await recipeService.list(userId);

                diet.meals.forEach(meal => normalizer.mealOutputNormalize(meal, dietOfDay, foods, recipes, true));
            }

            diary.diet = {
                _id: diet._id,
                meals: diet.meals
            }
        }

        return diary;
    },
    async update(data, userId) {
        const currentDiary = await Diary.findOne({ date: data.date, user: userId }).lean().exec();

        const diary = {
            user: userId,
            date: data.date,
            diet: {
                _id: data.diet._id,
                meals: data.diet.meals
            }
        };

        diary.diet.meals = diary.diet.meals.map(meal => normalizer.mealInputNormalize(meal, false, true));

        if (currentDiary) {
            await Diary.findOneAndUpdate({ _id: currentDiary._id, user: userId }, diary);
        } else {
            await new Diary(diary).save();
        }

        return diaryService.get(data.date, userId);
    }
};

module.exports = diaryService;