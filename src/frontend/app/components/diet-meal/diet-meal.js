import React, { Fragment, useState } from 'react';

import MealItem from './diet-meal-item';
import MealEditModal from '../meal-edit-modal/meal-edit-modal';

import CommonStyle from '../../../style/common.less';
import Style from './diet-meal.less';

export default function (props) {
    const [isEditing, setEditing] = useState(false);

    const getItemValue = (item, type) => {
        return JSON.stringify({ mealId: props.meal.id, itemId: item.id, type: type });
    };

    const mealEditCloseHandler = () => {
        setEditing(false);
    };

    const editButton = <i
        onClick={ () => setEditing(!isEditing) }
        className={ ['fas fa-pencil-alt', Style.EditIcon].join(' ') } />;

    return (
        <Fragment>
            <div className={ CommonStyle.Box }>
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
            { isEditing ? <MealEditModal meal={ props.meal } closeHandler={ mealEditCloseHandler } /> : null }
        </Fragment>
    )
}