import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import DietMeal from '../../components/diet-meal/diet-meal';

import CS from '../../../style/common.less'
import DietMealEditor from '../../components/diet-meal/diet-meal-editor';

export default function () {
    const blankMeal = {
        time: '',
        name: '',
        receipts: [],
        foods: []
    };

    const { dietId } = useParams();
    const [diet, setDiet] = useState(null);
    const [isInserting, setInserting] = useState(false);

    const newMealHandler = () => {

    };

    useEffect(() => {
        axios.get(`/api/diet/${ dietId }`).then(response => {
            setDiet(response.data);
        });
    }, [dietId]);

    return (
        <div className={ CS.CommonPage }>
            { diet ? (
                <div>
                    <h3>{ diet.name }</h3>
                    { diet.meals.map(meal => {
                        return <DietMeal key={ meal.id } meal={ meal } editMode />
                    }) }
                    <div className={ CS.Box }>
                        { isInserting ? (
                            <DietMealEditor meal={ blankMeal } mealCancelEditClickHandler={ () => setInserting(false) } />
                        ) : (
                            <div onClick={ () => setInserting(true) } className={ CS.Pad02 }>
                                Nova Refeição
                            </div>
                        ) }
                    </div>
                </div>
            ) : null }
        </div>
    )
}