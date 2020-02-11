import http from '../../service/http-service';

import { GET_USER, USER_REGISTER, USER_LOGIN } from './action-types'

export const getUser = (userId, forceUpdate = false) => {
    return (dispatch, getState) => {
        if (!forceUpdate && getState().userState.user) {
            return;
        }

        dispatch({
            type: GET_USER,
            promise: http.get(`/api/user/${ userId }`)
        });
    }
};

export const register = (data) => {
    return (dispatch) => {
        const promise = http.post('/api/user/register', data);

        dispatch({
            type: USER_REGISTER,
            promise: promise
        });

        return promise;
    }
};

export const commonLogin = (data) => {
    return (dispatch) => {
        const promise = http.post('/api/user/login', data);

        dispatch({
            type: USER_LOGIN,
            promise: promise
        });

        return promise;
    }
};

export const googleLogin = (data) => {
    return (dispatch) => {
        const promise = http.post('/api/user/login/google', data);

        dispatch({
            type: USER_LOGIN,
            promise: promise
        });

        return promise;
    }
};