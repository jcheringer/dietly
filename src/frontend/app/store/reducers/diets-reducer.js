import { GET_DIET_LIST_SUCCESS } from '../actions/action-types';

const initialState = {
    dietList: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_DIET_LIST_SUCCESS: {
            return {
                ...state,
                dietList: action.data
            }
        }
        default:
            return state
    }
};