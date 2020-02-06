import React, { Fragment } from 'react';

import MealInfoItem from './meal-info-item';

import Style from './meal-info.less';
import CS from '../../../style/common.less';

export default function (props) {
    const getItemValue = (item, type) => {
        return JSON.stringify({ mealId: props.meal._id, itemId: item._id, type: type });
    };

    const mealEditClickHandler = () => {
        if (!props.mealEditClickHandler) {
            return;
        }

        props.mealEditClickHandler(true);
    };

    const mealRemoveClickHandler = () => {
        if (!props.mealRemoveClickHandler) {
            return;
        }

        props.mealRemoveClickHandler(props.meal);
    };

    return (
        <div className={ Style.MealInfo }>
            <div className={ Style.MealHeader }>
                <span className={ Style.MealName }>{ props.meal.time }: { props.meal.name }</span>
                { props.editMode && (
                    <Fragment>
                        <i onClick={ mealEditClickHandler }
                           className={ ['fas fa-pencil-alt', CS.BorderedIcon].join(' ') } />
                        <i onClick={ mealRemoveClickHandler }
                           className={ ['far fa-trash-alt', CS.Ml01, CS.BorderedIcon, CS.RedIcon].join(' ') } />
                    </Fragment>
                ) }
            </div>
            { props.meal.recipes.map(recipe => {
                return <MealInfoItem
                    key={ recipe._id }
                    name={ recipe.name }
                    amountText={ recipe.amountText }
                    hideCheck={ props.editMode }
                    checked={ recipe.checked }
                    value={ getItemValue(recipe, 'recipes') }
                    mealItemChangeHandler={ props.mealItemChangeHandler }
                />
            }) }
            { props.meal.foods.map(food => {
                return <MealInfoItem
                    key={ food._id }
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