import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import DietMeal from '../../components/diet-meal/diet-meal';

import CS from '../../../style/common.less'

export default function () {
    const { dietId } = useParams();
    const [diet, setDiet] = useState(null);

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
                    {
                        diet.meals.map(meal => {
                            return <DietMeal
                                key={ meal.id }
                                meal={ meal }
                                editMode
                            />
                        })
                    }
                </div>
            ) : null }
        </div>
    )
}