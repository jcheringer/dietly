const moment = require('moment');

const util = require('../util/util');
const Diary = require('../model/diary');
const dietScheduleService = require('./diet-schedule-service');
const dietService = require('./diet-service');
const foodService = require('./food-service');
const recipeService = require('./recipe-service');

const diaryService = {
    async get(date) {
        const dietSchedule = await dietScheduleService.get();
        const momentDate = moment(date);
        const dietOfDayId = dietSchedule[momentDate.isoWeekday()];

        let dietOfDay = await dietService.get(dietOfDayId);
        const savedDiet = await Diary
            .findOne({ date: date })
            .populate('diet.meals.foods.food diet.meals.recipes.recipe')
            .lean()
            .exec();

        const diet = savedDiet ? savedDiet.diet : dietOfDay;

        if (savedDiet && (!dietOfDay || dietOfDay._id.toString() !== savedDiet.diet._id.toString())) {
            dietOfDay = await dietService.get(savedDiet.diet._id);
        }

        const diary = {
            date: date
        };

        if (diet) {
            if (!diet.name) {
                const foods = await foodService.list();
                const recipes = await recipeService.list();

                diet.meals.forEach(meal => util.mealOutputNormalize(meal, dietOfDay, foods, recipes, true));
            }

            diary.diet = {
                _id: diet._id,
                meals: diet.meals
            }
        }

        return diary;
    },
    async update(data) {
        const currentDiary = await Diary.findOne({ date: data.date }).lean().exec();

        const diary = {
            date: data.date,
            diet: {
                _id: data.diet._id,
                meals: data.diet.meals
            }
        };

        diary.diet.meals = diary.diet.meals.map(meal => util.mealInputNormalize(meal, false, true));

        if (currentDiary) {
            await Diary.findByIdAndUpdate(currentDiary._id, diary);
        } else {
            await new Diary(diary).save();
        }

        return diaryService.get(data.date);
    }
};

module.exports = diaryService;