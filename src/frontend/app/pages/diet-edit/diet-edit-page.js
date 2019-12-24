import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import DietMeal from '../../components/diet-meal/diet-meal';

import CS from '../../../style/common.less'
import DietMealEditor from '../../components/diet-meal/diet-meal-editor';

export default function () {
    const blankDiet = {
        name: '',
        meals: []
    };

    const blankMeal = {
        time: '',
        name: '',
        receipts: [],
        foods: []
    };

    const { dietId } = useParams();
    const [diet, setDiet] = useState(null);
    const [isInserting, setInserting] = useState(false);

    const dietNameChangeHanlder = (event) => {
        const newDiet = { ...diet };
        newDiet.name = event.target.value;
        setDiet(newDiet);
    };

    useEffect(() => {
        if (!dietId || dietId <= 0) {
            setDiet({ ...blankDiet });
            return;
        }

        axios.get(`/api/diet/${ dietId }`).then(response => {
            setDiet(response.data);
        });
    }, [dietId]);

    return (
        <div className={ CS.CommonPage }>
            { diet ? (
                <div>
                    <div className={ [CS.DFlex, CS.AiCenter].join(' ') }>
                        <div className={ [CS.FloatingLabelContainer, CS.Mb03, CS.Fgrow].join(' ') }>
                            <input type="text" placeholder="Nome da Dieta" value={ diet.name } onChange={ dietNameChangeHanlder } />
                            <label>Nome da Dieta</label>
                        </div>
                        <button className={ [CS.BtnPrimary, CS.Mb02].join(' ') }>Salvar</button>
                    </div>
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