import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { getDiet, getDietList } from '../../store/actions/diets-action';

import Meal from '../../components/meal/meal';
import MealEditor from '../../components/meal-editor/meal-editor';

import CS from '../../../style/common.less'

const dietEditPage = (props) => {
    const blankMeal = { id: null, time: '', name: '', recipes: [], foods: [] };

    const history = useHistory();
    const params = useParams();
    const dietId = Number(params.dietId);
    const [diet, setDiet] = useState(null);
    const [isInserting, setInserting] = useState(false);

    const dietNameChangeHandler = (event) => {
        const newDiet = { ...diet };
        newDiet.name = event.target.value;
        setDiet(newDiet);
    };

    const saveDietClickHandler = () => {
        const method = diet.id ? 'PUT' : 'POST';

        axios({ url: '/api/diet', method: method, data: diet }).then(response => {
            const savedDiet = response.data;

            props.getDietList(true);

            if (savedDiet.id !== dietId) {
                history.push(`/diet/${ savedDiet.id }`);
            }
        });
    };

    useEffect(() => {
        props.getDiet(dietId);
    }, [dietId]);

    useEffect(() => {
        setDiet(props.diet);
    }, [props.diet]);

    return (
        <div className={ CS.CommonPage }>
            { diet && (!diet.id || diet.id === dietId) && (
                <div>
                    <div className={ [CS.DFlex, CS.AiCenter].join(' ') }>
                        <div className={ [CS.FloatingLabelContainer, CS.Mb03, CS.Fgrow].join(' ') }>
                            <input type="text" placeholder="Nome da Dieta" value={ diet.name } onChange={ dietNameChangeHandler } />
                            <label>Nome da Dieta</label>
                        </div>
                        <button onClick={ saveDietClickHandler } className={ [CS.BtnPrimary, CS.Mb02].join(' ') }>Salvar</button>
                    </div>
                    { diet.meals.map(meal => {
                        return <Meal key={ meal.id } meal={ meal } dietId={ dietId } editMode />
                    }) }
                    { diet.id && (
                        <div className={ CS.Box }>
                            { isInserting ? (
                                <MealEditor meal={ blankMeal } dietId={ dietId } mealCancelEditClickHandler={ () => setInserting(false) } />
                            ) : (
                                <div onClick={ () => setInserting(true) } className={ CS.Pad02 }>
                                    Nova Refeição
                                </div>
                            ) }
                        </div>
                    ) }
                </div>
            ) }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        diet: state.dietState.diet
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDiet: (dietId) => dispatch(getDiet(dietId)),
        getDietList: (forceUpdate) => dispatch(getDietList(forceUpdate))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(dietEditPage);