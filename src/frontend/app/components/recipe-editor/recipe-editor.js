import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import MealItemEditor from '../meal-item-editor/meal-item-editor';
import MealItemList from '../meal-item-list/meal-item-list';

import { saveRecipe } from '../../store/actions/recipes-action';

import { MEAL_TYPE } from '../../../../constants';

import CS from '../../../style/common.less';

const recipeEditor = (props) => {
    const blankIngredient = { _id: null, amount: '', measureUnit: 0 };

    const [_id, setId] = useState(null);
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
        const idx = newIngredients.findIndex(i => i._id === ingredient._id);

        newIngredients.splice(idx, 1);
        setIngredients(newIngredients);
    };

    const saveRecipeHeandler = () => {
        const recipe = {
            name: name,
            ingredients: ingredients
        };

        if (_id) {
            recipe._id = _id;
        }

        props.saveRecipe(recipe);
        props.cancelEditHandler();
    };

    const saveMealItemHandler = (item) => {
        const newIngredients = _.cloneDeep(ingredients);

        const idx = newIngredients.findIndex(i => i._id === item._id);

        if (idx !== -1) {
            newIngredients[idx] = item;
        } else {
            newIngredients.push(item);
        }

        setIngredients(newIngredients);
        setIsEditing(false);
    };

    const cancelEditMealItemHandler = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        setId(props.recipe._id);
        setName(props.recipe.name);
        setIngredients(props.recipe.ingredients.map(i => ({ ...i, type: MEAL_TYPE.FOOD })));
    }, [props.recipe]);

    const recipeEditorClasses = [CS.SideSlider];

    if (isEditing) {
        recipeEditorClasses.push(CS.Editing);
    }

    return (
        <div className={ recipeEditorClasses.join(' ') }>
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
                    <button onClick={ saveRecipeHeandler } className={ CS.BtnPrimary }>Salvar</button>
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
        saveRecipe: (recipe) => dispatch(saveRecipe(recipe))
    }
};

export default connect(null, mapDispatchToProps)(recipeEditor);