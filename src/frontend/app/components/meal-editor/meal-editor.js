import React, { useState, useEffect } from 'react';

import MealItemEditor from '../meal-item-editor/meal-item-editor';
import MealItemList from '../meal-item-list/meal-item-list';

import { MEAL_TYPE } from '../../util/constants';

import CS from '../../../style/common.less';

export default function (props) {
    const blankItem = { id: null, amount: '', measureUnit: 0 };

    const [mealTime, setMealTime] = useState(props.meal.time);
    const [mealName, setMealName] = useState(props.meal.name);
    const [receipts, setReceipts] = useState(props.meal.receipts);
    const [foods, setFoods] = useState(props.meal.foods);
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

    const cancelEditMealItemHandler = () => {
        setEditing(false);
    };

    useEffect(() => {
        let items = [];
        receipts.forEach(receipt => items.push({ ...receipt, type: MEAL_TYPE.RECEIPT }));
        foods.forEach(food => items.push({ ...food, type: MEAL_TYPE.FOOD }));

        setMealItems(items);
    }, [receipts, foods]);

    const mealEditWrapperClasses = [CS.SideSlider];

    if (isEditing) {
        mealEditWrapperClasses.push(CS.Editing);
    }

    return (
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
                    showAmount
                />
                <div className={ [CS.ActionContainer, CS.Mt02].join(' ') }>
                    <button className={ CS.BtnPrimary }>Salvar</button>
                    <button onClick={ () => props.mealCancelEditClickHandler(false) }>Cancelar</button>
                </div>
            </div>
            <div className={ CS.SlideItem }>
                <MealItemEditor item={ editingItem } cancelEditHandler={ cancelEditMealItemHandler } />
            </div>
        </div>
    );
}