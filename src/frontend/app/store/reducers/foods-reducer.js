import { GET_FOOD_LIST_SUCCESS } from '../actions/action-types';

const initialState = {
    foodList: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_FOOD_LIST_SUCCESS: {
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