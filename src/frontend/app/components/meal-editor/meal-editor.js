import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import http from '../../service/http-service';
import { getDiet } from '../../store/actions/diets-action';
import MealItemEditor from '../meal-item-editor/meal-item-editor';
import MealItemList from '../meal-item-list/meal-item-list';
import Modal from '../../components/modal/modal';

import { MEAL_TYPE } from '../../../../constants';

import CS from '../../../style/common.less';

const mealEditor = (props) => {
    const blankItem = { _id: null, amount: '', measureUnit: 0 };

    const [mealId, setMealId] = useState(props.meal._id);
    const [mealTime, setMealTime] = useState(props.meal.time);
    const [mealName, setMealName] = useState(props.meal.name);
    const [recipes] = useState(props.meal.recipes);
    const [foods] = useState(props.meal.foods);
    const [mealItems, setMealItems] = useState([]);
    const [isEditing, setEditing] = useState(false);
    const [editingItem, setEditingItem] = useState({ ...blankItem });

    const mealTimeChangeHandler = (event) => {
        setMealTime(event.target.value);
    };

    const mealNameChangeHandler = (event) => {
        setMealName(event.target.value)
    };

    const editMealItemHandler = (editingItem = { ...blankItem }) => {
        setEditingItem(editingItem);
        setEditing(true);
    };

    const removeMealItemHandler = (item) => {
        const newMealItems = _.cloneDeep(mealItems);
        const idx = newMealItems.findIndex(i => i._id === item._id);

        newMealItems.splice(idx, 1);
        setMealItems(newMealItems);
    };

    const saveMealItemHandler = (item) => {
        const newMealItems = _.cloneDeep(mealItems);

        const idx = newMealItems.findIndex(i => i._id === item._id && i.type === item.type);

        if (idx !== -1) {
            newMealItems[idx] = item;
        } else {
            newMealItems.push(item);
        }

        setMealItems(newMealItems);
        setEditing(false);
    };

    const mealSaveClickHandler = () => {
        const foods = mealItems.filter(i => i.type === MEAL_TYPE.FOOD);
        const recipes = mealItems.filter(i => i.type === MEAL_TYPE.RECIPE);

        const meal = {
            _id: mealId,
            name: mealName,
            time: mealTime,
            recipes: recipes,
            foods: foods
        };

        const method = mealId ? 'PUT' : 'POST';

        http({ url: '/api/diet/meal', method: method, data: { dietId: props.dietId, meal: meal } }).then(() => {
            props.getDiet(props.dietId);
            props.mealCancelEditClickHandler(false);
        });
    };

    const cancelEditMealItemHandler = () => {
        setEditing(false);
    };

    useEffect(() => {
        let items = [];
        recipes.forEach(recipe => items.push({ ...recipe, type: MEAL_TYPE.RECIPE }));
        foods.forEach(food => items.push({ ...food, type: MEAL_TYPE.FOOD }));

        setMealItems(items);
    }, [recipes, foods]);

    const mealEditWrapperClasses = [CS.SideSlider];

    if (isEditing) {
        mealEditWrapperClasses.push(CS.Editing);
    }

    return (
        <Modal>
            <div className={ mealEditWrapperClasses.join(' ') }>
                <div className={ CS.SlideItem }>
                    <div className={ [CS.DFlex, CS.Mb02].join(' ') }>
                        <div className={ CS.FloatingLabelContainer }>
                            <input type="time" placeholder="Hora" value={ mealTime } onChange={ mealTimeChangeHandler } />
                            <label>Hora</label>
                        </div>
                        <div className={ CS.FloatingLabelContainer }>
                            <input type="text" placeholder="Nome" value={ mealName } onChange={ mealNameChangeHandler } />
                            <label>Nome</label>
                        </div>
                    </div>
                    <MealItemList
                        itemList={ mealItems }
                        includeText="Inserir Alimento"
                        editItemHandler={ editMealItemHandler }
                        removeItemHandler={ removeMealItemHandler }
                        showAmount
                    />
                    <div className={ [CS.ActionContainer, CS.Mt02].join(' ') }>
                        <button onClick={ mealSaveClickHandler } className={ CS.BtnPrimary }>Salvar</button>
                        <button onClick={ () => props.mealCancelEditClickHandler(false) }>Cancelar</button>
                    </div>
                </div>
                <div className={ CS.SlideItem }>
                    <MealItemEditor
                        item={ editingItem }
                        saveItemHandler={ saveMealItemHandler }
                        cancelEditHandler={ cancelEditMealItemHandler } />
                </div>
            </div>
        </Modal>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDiet: (dietId) => dispatch(getDiet(dietId))
    }
};

mealEditor.propTypes = {
    dietId: PropTypes.string.isRequired,
    meal: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(mealEditor);