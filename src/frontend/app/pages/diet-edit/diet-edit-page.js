import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import { getDiet, getDietList } from '../../store/actions/diets-action';

import Meal from '../../components/meal/meal';
import MealEditor from '../../components/meal-editor/meal-editor';
import ConfirmationModal from '../../components/modal/confirmation-modal';
import DietScheduler from '../../components/diet-scheduler/diet-scheduler';

import CS from '../../../style/common.less'

const dietEditPage = (props) => {
    const blankMeal = { id: null, time: '', name: '', recipes: [], foods: [] };

    const history = useHistory();
    const params = useParams();
    const dietId = params.dietId;
    const [diet, setDiet] = useState({ name: '', meals: [] });
    const [isInserting, setInserting] = useState(false);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmClickHandler, setConfirmClickHandler] = useState(null);

    const dietNameChangeHandler = (event) => {
        const newDiet = { ...diet };
        newDiet.name = event.target.value;
        setDiet(newDiet);
    };

    const saveDietClickHandler = (diet) => {
        const method = diet._id ? 'PUT' : 'POST';

        axios({ url: '/api/diet', method: method, data: diet }).then(response => {
            const savedDiet = response.data;

            props.getDietList(true);

            if (savedDiet._id !== dietId) {
                history.push(`/diet/${ savedDiet._id }`);
            }
        });
    };

    const mealRemoveClickHandler = (meal) => {
        setConfirmClickHandler(() => {
            return () => {
                const newDiet = _.cloneDeep(diet);
                const idx = newDiet.meals.findIndex(m => m._id === meal._id);

                newDiet.meals.splice(idx, 1);
                setDiet(newDiet);
                saveDietClickHandler(newDiet);
                setShowConfirmation(false);
            }
        });

        setShowConfirmation(true);
    };

    const cancelConfirmClickHandler = () => {
        setShowConfirmation(false);
    };

    useEffect(() => {
        props.getDiet(dietId);
    }, [dietId]);

    useEffect(() => {
        if (!props.diet) {
            return
        }

        setDiet(props.diet);
    }, [props.diet]);

    return (
        <div className={ CS.CommonPage }>
            { showConfirmation && (
                <ConfirmationModal
                    confirmClickHandler={ confirmClickHandler }
                    cancelClickHandler={ cancelConfirmClickHandler } />
            ) }
            { diet && (!diet._id || diet._id === dietId) && (
                <div>
                    <div className={ [CS.DFlex, CS.AiCenter].join(' ') }>
                        <div className={ [CS.FloatingLabelContainer, CS.Mb03, CS.Fgrow].join(' ') }>
                            <input type="text" placeholder="Nome da Dieta" value={ diet.name } onChange={ dietNameChangeHandler } />
                            <label>Nome da Dieta</label>
                        </div>
                        <button onClick={ () => saveDietClickHandler(diet) } className={ [CS.BtnPrimary, CS.Mb02].join(' ') }>Salvar</button>
                    </div>
                    { diet._id && <DietScheduler dietId={ diet._id } /> }
                    { diet.meals.map(meal => {
                        return <Meal
                            key={ meal._id }
                            meal={ meal }
                            dietId={ dietId }
                            mealRemoveClickHandler={ mealRemoveClickHandler }
                            editMode />
                    }) }
                    { diet._id && (
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