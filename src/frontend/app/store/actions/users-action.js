import http from '../../service/http-service';

import { USER_LOGIN } from './action-types'

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