import { GET_DIET_LIST_SUCCESS, GET_DIET_SUCCESS } from '../actions/action-types';

const initialState = {
    dietList: null,
    diet: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_DIET_LIST_SUCCESS: {
            return {
                ...state,
                dietList: action.data
            }
        }
        case GET_DIET_SUCCESS: {
            return {
                ...state,
                diet: action.data
            }
        }
        default:
            return state
    }
};