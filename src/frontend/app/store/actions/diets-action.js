import axios from 'axios';
import { GET_DIET, GET_DIET_LIST } from './action-types';

export const getDietList = (forceUpdate = false) => {
    return (dispatch, getState) => {
        const dietList = getState().dietState.dietList;

        if (dietList && !forceUpdate) {
            return;
        }

        return dispatch({
            type: GET_DIET_LIST,
            promise: axios.get('/api/diet')
        });
    }
};

export const getDiet = (dietId) => (dispatch) => {
    return dispatch({
        type: GET_DIET,
        promise: axios.get(`/api/diet/${ dietId }`)
    });
};