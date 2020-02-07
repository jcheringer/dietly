import http from '../../service/http-service';

import { GET_FOOD_LIST, SAVE_FOOD, REMOVE_FOOD } from './action-types';

export const getFoodList = (forceUpdate = false) => {
    return (dispatch, getState) => {
        const foodList = getState().foodState.foodList;

        if (foodList && !forceUpdate) {
            return;
        }

        dispatch({
            type: GET_FOOD_LIST,
            promise: http.get('/api/food')
        });
    }
};

export const saveFood = (food) => {
    return (dispatch) => {
        const method = food._id ? 'PUT' : 'POST';

        dispatch({
            type: SAVE_FOOD,
            promise: http({ url: '/api/food', method: method, data: food })
        });
    }
};

export const removeFood = (foodId) => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_FOOD,
            promise: http.delete(`/api/food/${ foodId }`)
        })
    }
};