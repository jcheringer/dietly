import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import { getFoodList, removeFood } from '../../store/actions/foods-action';
import { getRecipeList, removeRecipe } from '../../store/actions/recipes-action';

import MealItemList from '../../components/meal-item-list/meal-item-list';
import Modal from '../../components/modal/modal';
import FoodEditor from '../../components/food-editor/food-editor';
import RecipeEditor from '../../components/recipe-editor/recipe-editor';

import Style from './menu-page.less';
import CS from '../../../style/common.less';

const menuPage = (props) => {
    const TABS = { FOOD: 'food', RECIPE: 'recipe' };
    const blankFood = { name: '', measureUnits: [] };
    const blankRecipe = { name: '', ingredients: [] };

    const [currentTab, setCurrentTab] = useState(TABS.FOOD);
    const [foodList, setFoodList] = useState([]);
    const [recipeList, setRecipeList] = useState([]);
    const [isEditing, setEditing] = useState(false);
    const [editingFood, setEditingFood] = useState(null);
    const [editingRecipe, setEditingRecipe] = useState(null);

    const changeCurrentTab = (tab) => setCurrentTab(tab);

    const editFoodHandler = (food) => {
        setEditingFood(food || { ...blankFood });
        setEditing(true);
    };

    const removeFoodHandler = (food) => {
        props.removeFood(food.id);
    };

    const editRecipeHandler = (recipe) => {
        setEditingRecipe(recipe || { ...blankRecipe });
        setEditing(true);
    };

    const removeRecipeHandler = (recipe) => {
        props.removeRecipe(recipe.id);
    };

    const cancelEditHandler = () => {
        setEditingRecipe(null);
        setEditingFood(null);
        setEditing(false);
    };

    let foodClass;
    let recipeClass;

    if (currentTab === TABS.FOOD) {
        foodClass = Style.ActiveTab;
    } else if (currentTab === TABS.RECIPE) {
        recipeClass = Style.ActiveTab;
    }

    useEffect(() => {
        props.getFoodList();
        props.getRecipeList();
    }, []);

    useEffect(() => {
        setFoodList(props.foodList || []);
    }, [props.foodList]);

    useEffect(() => {
        setRecipeList(props.recipeList || []);
    }, [props.recipeList]);

    return (
        <div>
            <ul className={ Style.MenuTabContainer }>
                <li onClick={ () => changeCurrentTab(TABS.FOOD) } className={ foodClass }>Alimentos</li>
                <li onClick={ () => changeCurrentTab(TABS.RECIPE) } className={ recipeClass }>Receitas</li>
            </ul>
            <div className={ CS.Pad02 }>
                { currentTab === TABS.FOOD && (
                    <MealItemList
                        itemList={ foodList }
                        includeText="Incluir Alimento"
                        editItemHandler={ editFoodHandler }
                        removeItemHandler={ removeFoodHandler }
                    />
                ) }
                { currentTab === TABS.RECIPE && (
                    <MealItemList
                        itemList={ recipeList }
                        includeText="Criar Receita"
                        editItemHandler={ editRecipeHandler }
                        removeItemHandler={ removeRecipeHandler }
                    />
                ) }
            </div>
            { isEditing && (
                <Modal>
                    { editingFood && (
                        <FoodEditor food={ editingFood } cancelEditHandler={ cancelEditHandler } />
                    ) }
                    { editingRecipe && (
                        <RecipeEditor recipe={ editingRecipe } cancelEditHandler={ cancelEditHandler } />
                    ) }
                </Modal>
            ) }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        foodList: state.foodState.foodList,
        recipeList: state.recipeState.recipeList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFoodList: () => dispatch(getFoodList()),
        getRecipeList: () => dispatch(getRecipeList()),
        removeFood: (foodId) => dispatch(removeFood(foodId)),
        removeRecipe: (recipeId) => dispatch(removeRecipe(recipeId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(menuPage)