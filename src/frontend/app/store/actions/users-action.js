import { USER_LOGIN } from './action-types'
import axios from 'axios';

export const googleLogin = (data) => {
    return (dispatch) => {
        const promise = axios.post('/api/user/login/google', data);

        dispatch({
            type: USER_LOGIN,
            promise: promise
        });

        return promise;
    }
};