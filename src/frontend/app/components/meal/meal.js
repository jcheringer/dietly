import React, { useState } from 'react';

import MealInfo from '../meal-info/meal-info';
import MealEditor from '../meal-editor/meal-editor';

import CommonStyle from '../../../style/common.less';

export default function (props) {
    const [isEditing, setEditing] = useState(false);

    const mealClickHandler = (isEditing) => {
        setEditing(isEditing);
    };

    return (
        <div className={ CommonStyle.Box }>
            <MealInfo
                meal={ props.meal }
                editMode={ props.editMode }
                mealEditClickHandler={ mealClickHandler }
                mealRemoveClickHandler={ props.mealRemoveClickHandler }
                mealItemChangeHandler={ props.mealItemChangeHandler } />
            { isEditing && (
                <MealEditor
                    meal={ props.meal }
                    dietId={ props.dietId }
                    mealCancelEditClickHandler={ mealClickHandler } />
            ) }
        </div>
    )
}