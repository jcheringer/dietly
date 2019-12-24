import React, { useState, useEffect } from 'react';

import DietMealItemEditor from '../diet-meal/diet-meal-item-editor';
import MenuItemList from '../../pages/menu/menu-item-list';

import { MEAL_TYPE } from '../../util/constants';

import CS from '../../../style/common.less';

export default function (props) {
    const blankIngredient = { id: null, amount: '', measureUnit: 0 };

    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState({ ...blankIngredient });

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    };

    const editIngredientClickHandler = (editingItem = { ...blankIngredient }) => {
        setEditingItem(editingItem);
        setIsEditing(true);
    };

    const cancelEditMealItemHandler = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        setName(props.receipt.name);
        setIngredients(props.receipt.ingredients.map(i => ({ ...i, type: MEAL_TYPE.FOOD })));
    }, [props.receipt]);

    const receiptEditorClasses = [CS.SideSlider];

    if (isEditing) {
        receiptEditorClasses.push(CS.Editing);
    }

    return (
        <div className={ receiptEditorClasses.join(' ') }>
            <div className={ [CS.SlideItem, CS.Pad02].join(' ') }>
                <div className={ [CS.FloatingLabelContainer, CS.Mb03].join(' ') }>
                    <input type="text" placeholder="Nome" value={ name } onChange={ nameChangeHandler } />
                    <label>Nome</label>
                </div>
                <MenuItemList
                    itemList={ ingredients }
                    includeText="Adicionar Ingrediente"
                    editItemHandler={ editIngredientClickHandler }
                    showAmount
                />
                <div className={ [CS.ActionContainer, CS.Mt02].join(' ') }>
                    <button className={ CS.BtnPrimary }>Salvar</button>
                    <button onClick={ props.cancelEditHandler }>Cancelar</button>
                </div>
            </div>
            <div className={ [CS.SlideItem, CS.Pad02].join(' ') }>
                <DietMealItemEditor item={ editingItem } type="food" cancelEditHandler={ cancelEditMealItemHandler } />
            </div>
        </div>
    )
}