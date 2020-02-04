import { GET_RECIPE_LIST, SAVE_RECIPE, REMOVE_RECIPE } from './action-types';
import axios from 'axios';

export const getRecipeList = (forceUpdate = false) => {
    return (dispatch, getState) => {
        const recipeList = getState().recipeState.recipeList;

        if (recipeList && !forceUpdate) {
            return;
        }

        return dispatch({
            type: GET_RECIPE_LIST,
            promise: axios.get('/api/recipe')
        });
    }
};

export const saveRecipe = (recipe) => {
    return (dispatch) => {
        const method = recipe._id ? 'PUT' : 'POST';

        return dispatch({
            type: SAVE_RECIPE,
            promise: axios({ url: '/api/recipe', method: method, data: recipe })
        });
    }
};

export const removeRecipe = (recipeId) => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_RECIPE,
            promise: axios.delete(`/api/recipe/${ recipeId }`)
        })
    }
};