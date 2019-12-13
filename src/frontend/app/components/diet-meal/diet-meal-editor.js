import React, { useState, useEffect } from 'react';

import DietMealItemEditor from './diet-meal-item-editor';

import Style from './diet-meal-editor.less';
import CommonStyle from '../../../style/common.less';

export default function (props) {
    const [mealTime, setMealTime] = useState(props.meal.time);
    const [mealName, setMealName] = useState(props.meal.name);
    const [receipts, setReceipts] = useState(props.meal.receipts);
    const [foods, setFoods] = useState(props.meal.foods);
    const [mealItems, setMealItems] = useState([]);
    const [isEditing, setEditing] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const mealTimeChangeHandler = (event) => {
        setMealTime(event.target.value);
    };

    const mealNameChangeHandler = (event) => {
        setMealName(event.target.value)
    };

    const editMealItemHandler = (editingItem) => {
        setEditingItem(editingItem);
        setEditing(true);
    };

    const cancelEditMealItemHandler = () => {
        setEditingItem(null);
        setEditing(false);
    };

    useEffect(() => {
        let items = [];
        receipts.forEach(receipt => items.push({ ...receipt, type: 'receipt' }));
        foods.forEach(food => items.push({ ...food, type: 'food' }));

        setMealItems(items);
    }, [receipts, foods]);

    const mealEditWrapperClasses = [Style.MealEditWrapper];

    if (isEditing) {
        mealEditWrapperClasses.push(Style.ItemEditing);
    }

    return (
        <div className={ mealEditWrapperClasses.join(' ') }>
            <i className={ ['fas fa-times', Style.CloseButton, CommonStyle.BorderedIcon].join(' ') }
               onClick={ () => props.mealCancelEditClickHandler(false) } />
            <div className={ Style.MealItemForm }>
                <div className={ Style.MealHeader }>
                    <div className={ CommonStyle.FloatingLabelContainer }>
                        <input type="time" placeholder="Hora" value={ mealTime } onChange={ mealTimeChangeHandler } />
                        <label>Hora</label>
                    </div>
                    <div className={ CommonStyle.FloatingLabelContainer }>
                        <input type="text" placeholder="Nome" value={ mealName } onChange={ mealNameChangeHandler } />
                        <label>Nome</label>
                    </div>
                </div>
                <div className={ Style.MealItemList }>
                    { mealItems.map(item => {
                        return (
                            <div key={ item.id } className={ Style.MealItem }>
                                <span>{ item.name } - { item.amountText }</span>
                                <i onClick={ () => editMealItemHandler(item) } className={ ['fas fa-pencil-alt', CommonStyle.BorderedIcon].join(' ') } />
                            </div>
                        )
                    }) }
                    <div onClick={ editMealItemHandler } className={ [Style.MealItem, Style.AddItemButton].join(' ') }>
                        <span>Inserir Alimento</span>
                        <i className={ ['fas fa-plus', CommonStyle.BorderedIcon].join(' ') } />
                    </div>
                </div>
                <button>Salvar</button>
            </div>
            <DietMealItemEditor item={ editingItem } cancelEditHandler={ cancelEditMealItemHandler } />
        </div>
    );
}