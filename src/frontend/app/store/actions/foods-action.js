import axios from 'axios';
import { GET_FOOD_LIST } from './action-types';

export const getFoodList = (forceUpdate = false) => {
    return (dispatch, getState) => {
        const foodList = getState().food.foodList;

        if (foodList && !forceUpdate) {
            return;
        }

        dispatch({
            type: GET_FOOD_LIST,
            promise: axios.get('/api/food ')
        });
    }
};