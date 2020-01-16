import React from 'react';

import MealInfoItem from './meal-info-item';

import Style from './meal-info.less';
import CommonStyle from '../../../style/common.less';

export default function (props) {
    const getItemValue = (item, type) => {
        return JSON.stringify({ mealId: props.meal.id, itemId: item.id, type: type });
    };

    const editButton = <i
        onClick={ () => props.mealEditClickHandler(true) }
        className={ ['fas fa-pencil-alt', CommonStyle.BorderedIcon].join(' ') } />;

    return (
        <div className={ Style.MealInfo }>
            <div className={ Style.MealHeader }>
                <span className={ Style.MealName }>{ props.meal.time }: { props.meal.name }</span>
                { props.editMode && editButton }
            </div>
            { props.meal.receipts.map(receipt => {
                return <MealInfoItem
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
                return <MealInfoItem
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