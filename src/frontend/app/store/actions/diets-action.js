import http from '../../service/http-service';

import { GET_DIET, GET_DIET_LIST, GET_DIET_SCHEDULE, SAVE_DIET_SCHEDULE } from './action-types';

export const getDietList = (forceUpdate = false) => {
    return (dispatch, getState) => {
        if (!forceUpdate && getState().dietState.dietList) {
            return;
        }

        return dispatch({
            type: GET_DIET_LIST,
            promise: http.get('/api/diet')
        });
    }
};

export const getDiet = (dietId) => (dispatch) => {
    return dispatch({
        type: GET_DIET,
        promise: http.get(`/api/diet/${ dietId }`)
    });
};

export const getDietSchedule = (forceUpdate = false) => {
    return (dispatch, getState) => {
        if (!forceUpdate && getState().dietState.dietSchedule) {
            return;
        }

        return dispatch({
            type: GET_DIET_SCHEDULE,
            promise: http.get('/api/schedule')
        });
    }
};

export const saveDietSchedule = (day, dietId) => (dispatch) => dispatch({
    type: SAVE_DIET_SCHEDULE,
    promise: http.put(`/api/schedule/${ day }`, { dietId })
});