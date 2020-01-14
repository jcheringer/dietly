import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import MealItemEditor from '../meal-item-editor/meal-item-editor';
import MealItemList from '../meal-item-list/meal-item-list';

import { saveReceipt } from '../../store/actions/receipts-action';

import { MEAL_TYPE } from '../../util/constants';

import CS from '../../../style/common.less';

const receiptEditor = (props) => {
    const blankIngredient = { id: null, amount: '', measureUnit: 0 };

    const [id, setId] = useState(null);
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

    const removeIngredientHandler = (ingredient) => {
        const newIngredients = _.cloneDeep(ingredients);
        const idx = newIngredients.findIndex(i => i.id === ingredient.id);

        newIngredients.splice(idx, 1);
        setIngredients(newIngredients);
    };

    const saveMealItemHandler = (item) => {
        const newIngredients = _.cloneDeep(ingredients);

        const idx = newIngredients.findIndex(i => i.id === item.id);

        if (idx !== -1) {
            newIngredients[idx] = item;
        } else {
            newIngredients.push(item);
        }

        setIngredients(newIngredients);
        setIsEditing(false);
    };

    const saveReceiptHeandler = () => {
        const receipt = {
            name: name,
            ingredients: ingredients
        };

        if (id) {
            receipt.id = id;
        }

        props.saveReceipt(receipt);
        props.cancelEditHandler();
    };

    const cancelEditMealItemHandler = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        setId(props.receipt.id);
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
                    <label>Nome da Receita</label>
                </div>
                <MealItemList
                    itemList={ ingredients }
                    includeText="Adicionar Ingrediente"
                    editItemHandler={ editIngredientClickHandler }
                    removeItemHandler={ removeIngredientHandler }
                    showAmount
                />
                <div className={ [CS.ActionContainer, CS.Mt02].join(' ') }>
                    <button onClick={ saveReceiptHeandler } className={ CS.BtnPrimary }>Salvar</button>
                    <button onClick={ props.cancelEditHandler }>Cancelar</button>
                </div>
            </div>
            <div className={ [CS.SlideItem, CS.Pad02].join(' ') }>
                <MealItemEditor
                    item={ editingItem }
                    type="food"
                    saveItemHandler={ saveMealItemHandler }
                    cancelEditHandler={ cancelEditMealItemHandler } />
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveReceipt: (receipt) => dispatch(saveReceipt(receipt))
    }
};

export default connect(null, mapDispatchToProps)(receiptEditor);