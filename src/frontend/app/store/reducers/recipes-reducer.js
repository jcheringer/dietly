import { GET_RECIPE_LIST_SUCCESS, SAVE_RECIPE_SUCCESS, REMOVE_RECIPE_SUCCESS } from '../actions/action-types';

const initialState = {
    recipeList: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPE_LIST_SUCCESS:
        case SAVE_RECIPE_SUCCESS:
        case REMOVE_RECIPE_SUCCESS: {
            return {
                ...state,
                recipeList: action.data
            }
        }
        default: {
            return state
        }
    }
}