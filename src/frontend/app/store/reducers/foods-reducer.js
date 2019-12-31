import { GET_FOOD_LIST_SUCCESS, SAVE_FOOD_SUCCESS, REMOVE_FOOD_SUCCESS } from '../actions/action-types';

const initialState = {
    foodList: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_FOOD_LIST_SUCCESS:
        case SAVE_FOOD_SUCCESS:
        case REMOVE_FOOD_SUCCESS: {
            return {
                ...state,
                foodList: action.data
            }
        }
        default: {
            return state
        }
    }
}