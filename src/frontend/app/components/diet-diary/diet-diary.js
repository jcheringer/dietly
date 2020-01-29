import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';

import Meal from '../meal/meal';
import Style from './diet-diary.less';

export default function () {
    const [currentDate, setCurrentDate] = useState(moment());
    const [dietId, setDietId] = useState(null);
    const [meals, setMeals] = useState([]);

    const changeCurrentDate = (amount) => {
        const newDate = currentDate.clone().add(amount, 'day');
        setCurrentDate(newDate);
    };

    const mealItemChangeHandler = (event) => {
        const { mealId, itemId, type } = JSON.parse(event.target.value);
        const mealsCopy = _.cloneDeep(meals);
        const meal = mealsCopy.find(m => m.id === mealId);
        const item = meal[type].find(item => item.id === itemId);

        item.checked = !item.checked;

        setMeals(mealsCopy);

        const diary = {
            date: currentDate.format('YYYY-MM-DD'),
            diet: {
                id: dietId,
                meals: mealsCopy
            }
        };

        axios.post('/api/diary', diary).catch(() => {
            //TODO: Send an error message
            item.checked = !item.checked;
            setMeals(mealsCopy);
        });
    };

    useEffect(() => {
        const date = currentDate.format('YYYY-MM-DD');

        axios.get(`/api/diary/${ date }`).then(response => {
            setDietId(response.data.diet.id);
            setMeals(response.data.diet.meals);
        });
    }, [currentDate]);

    return (
        <div className={ Style.DietDiary }>
            <div className={ Style.DiaryTitle }>
                <button onClick={ () => changeCurrentDate(-1) }>Prev</button>
                <h3>{ currentDate.format('dddd, DD [de] MMMM') }</h3>
                <button onClick={ () => changeCurrentDate(1) }>Next</button>
            </div>
            { meals.map(meal => {
                return <Meal
                    key={ meal.id }
                    meal={ meal }
                    mealItemChangeHandler={ mealItemChangeHandler }
                />
            }) }
        </div>
    )
}