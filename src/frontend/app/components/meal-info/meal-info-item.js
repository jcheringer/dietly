import React from 'react';

import Style from './meal-info-item.less';

export default function (props) {
    let checkbox = <input
        type="checkbox"
        checked={ props.checked }
        value={ props.value }
        onChange={ props.mealItemChangeHandler } />;

    return (
        <div className={ Style.MealItemContainer }>
            { props.hideCheck ? null : checkbox }
            <div className={ Style.MealItemName }>
                <span>{ props.name }</span>
                <hr />
                <span>{ props.amountText }</span>
            </div>
        </div>
    )
}