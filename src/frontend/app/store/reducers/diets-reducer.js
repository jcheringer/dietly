import { GET_DIET_LIST_SUCCESS, GET_DIET_SUCCESS, GET_DIET_SCHEDULE_SUCCESS, SAVE_DIET_SCHEDULE_SUCCESS } from '../actions/action-types';

const initialState = {
    dietList: null,
    diet: null,
    dietSchedule: null
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
        case GET_DIET_SCHEDULE_SUCCESS:
        case SAVE_DIET_SCHEDULE_SUCCESS: {
            return {
                ...state,
                dietSchedule: action.data
            }
        }
        default:
            return state
    }
};