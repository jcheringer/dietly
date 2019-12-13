import React, { useState } from 'react';

import MealItem from './diet-meal-item';

import Style from './diet-meal-info.less';
import CommonStyle from '../../../style/common.less';

export default function (props) {
    const getItemValue = (item, type) => {
        return JSON.stringify({ mealId: props.meal.id, itemId: item.id, type: type });
    };

    const editButton = <i
        onClick={ () => props.mealEditClickHandler(true) }
        className={ ['fas fa-pencil-alt', Style.EditIcon, CommonStyle.BorderedIcon].join(' ') } />;

    return (
        <div className={ Style.DietMealInfo }>
            <div className={ Style.MealHeader }>
                <span className={ Style.MealName }>{ props.meal.time }: { props.meal.name }</span>
                { props.editMode ? editButton : null }
            </div>
            { props.meal.receipts.map(receipt => {
                return <MealItem
                    key={ receipt.id }
                    name={ receipt.name }
                    amountText={ receipt.amountText }
                    hideCheck={ props.editMode }
                    checked={ receipt.checked }
                    value={ getItemValue(receipt, 'receipts') }
                    mealItemChangeHandler={ props.mealItemChangeHandler }
                />
            }) }
            { props.meal.foods.map(food => {
                return <MealItem
                    key={ food.id }
                    name={ food.name }
                    amountText={ food.amountText }
                    hideCheck={ props.editMode }
                    checked={ food.checked }
                    value={ getItemValue(food, 'foods') }
                    mealItemChangeHandler={ props.mealItemChangeHandler }
                />
            }) }
        </div>
    )
}