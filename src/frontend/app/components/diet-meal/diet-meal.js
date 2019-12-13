import React, { useState } from 'react';

import DietMealInfo from './diet-meal-info';
import DietMealEditor from './diet-meal-editor';

import CommonStyle from '../../../style/common.less';

export default function (props) {
    const [isEditing, setEditing] = useState(false);

    const mealClickHandler = (isEditing) => {
        setEditing(isEditing);
    };

    return (
        <div className={ CommonStyle.Box }>
            { !isEditing ? (
                <DietMealInfo
                    meal={ props.meal }
                    editMode={ props.editMode }
                    mealEditClickHandler={ mealClickHandler }
                    mealItemChangeHandler={ props.mealItemChangeHandler } />
            ) : (
                <DietMealEditor
                    meal={ props.meal }
                    mealCancelEditClickHandler={ mealClickHandler } />
            ) }
        </div>
    )
}