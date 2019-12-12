import React, { useState } from 'react';

import Style from './meal-edit-modal.less';
import CS from '../../../style/common.less'

export default function (props) {
    const [mealTime, setMealTime] = useState(props.meal.time);
    const [mealName, setMealName] = useState(props.meal.name);
    const [receipts, setReceipts] = useState(props.meal.receipts);
    const [foods, setFoods] = useState(props.meal.foods);

    const [isEditing, setEditing] = useState(false);

    const mealTimeChangeHandler = (event) => {
        setMealTime(event.target.value);
    };

    const mealNameChangeHandler = (event) => {
        setMealName(event.target.value)
    };

    const editMealItemHandler = () => {
        setEditing(true);
    };

    const mealEditWrapperClasses = [Style.MealEditWrapper];

    if (isEditing) {
        mealEditWrapperClasses.push(Style.ItemEditing);
    }

    return (
        <div className={ Style.MealEditModal }>
            <div className={ Style.MealEditContainer }>
                <i className={ ['fas fa-times', Style.CloseButton].join(' ') } onClick={ props.closeHandler } />
                <div className={ mealEditWrapperClasses.join(' ') }>
                    <div className={ Style.MealItemList }>
                        <div className={ Style.MealHeader }>
                            <div className={ CS.FloatingLabelContainer }>
                                <input type="time" placeholder="Hora" value={ mealTime } onChange={ mealTimeChangeHandler } />
                                <label>Hora</label>
                            </div>
                            <div className={ CS.FloatingLabelContainer }>
                                <input type="text" placeholder="Nome" value={ mealName } onChange={ mealNameChangeHandler } />
                                <label>Nome</label>
                            </div>
                        </div>
                        <div>
                            { receipts.map(receipt => {
                                return (
                                    <div key={ receipt.id } className={ Style.MealItem }>
                                        <span>{ receipt.name } - { receipt.amountText }</span>
                                        <i onClick={ editMealItemHandler } className={ ['fas fa-pencil-alt', Style.EditIcon].join(' ') } />
                                    </div>
                                )
                            }) }
                            { foods.map(food => {
                                return (
                                    <div key={ food.id } className={ Style.MealItem }>
                                        <span>{ food.name } - { food.amountText }</span>
                                        <i onClick={ editMealItemHandler } className={ ['fas fa-pencil-alt', Style.EditIcon].join(' ') } />
                                    </div>
                                )
                            }) }
                        </div>
                        <button>Salvar</button>
                    </div>
                    <div className={ Style.MealItemEditor }>
                        <span>Editor</span>
                        <button onClick={ () => setEditing(false) }>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}