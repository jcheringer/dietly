import axios from 'axios';
import { GET_DIET_LIST } from './action-types';

export const getDietList = (forceUpdate = false) => {
    return (dispatch, getState) => {
        const dietList = getState().diet.dietList;

        if (dietList && !forceUpdate) {
            return;
        }

        return dispatch({
            type: GET_DIET_LIST,
            promise: axios.get('/api/diet')
        });
    }
};