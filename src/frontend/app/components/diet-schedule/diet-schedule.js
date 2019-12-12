import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';

import DietMeal from '../diet-meal/diet-meal';
import Style from './diet-schedule.less';

export default function () {
    const [currentDate, setCurrentDate] = useState(moment());
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
    };

    useEffect(() => {
        axios.get(`/api/diet-schedule/${ currentDate.format('YYYY-MM-DD') }`).then(response => {
            setMeals(response.data);
        });
    }, [currentDate]);

    return (
        <div className={ Style.DietSchedule }>
            <div className={ Style.ScheduleTitle }>
                <button onClick={ () => changeCurrentDate(-1) }>Prev</button>
                <h3>{ currentDate.format('dddd, DD [de] MMMM') }</h3>
                <button onClick={ () => changeCurrentDate(1) }>Next</button>
            </div>
            { meals.map(meal => {
                return <DietMeal
                    key={ meal.id }
                    meal={ meal }
                    mealItemChangeHandler={ mealItemChangeHandler }
                />
            }) }
        </div>
    )
}