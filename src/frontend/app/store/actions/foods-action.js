import axios from 'axios';
import { GET_FOOD_LIST, SAVE_FOOD, REMOVE_FOOD } from './action-types';

export const getFoodList = (forceUpdate = false) => {
    return (dispatch, getState) => {
        const foodList = getState().food.foodList;

        if (foodList && !forceUpdate) {
            return;
        }

        dispatch({
            type: GET_FOOD_LIST,
            promise: axios.get('/api/food')
        });
    }
};

export const saveFood = (food) => {
    return (dispatch) => {
        const method = food.id ? 'PUT' : 'POST';

        dispatch({
            type: SAVE_FOOD,
            promise: axios({ url: '/api/food', method: method, data: food })
        });
    }
};

export const removeFood = (foodId) => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_FOOD,
            promise: axios.delete(`/api/food/${ foodId }`)
        })
    }
};