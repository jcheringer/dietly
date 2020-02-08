import axios from 'axios';
import AuthService from './auth-service';
import History from '../utils/history';

const http = axios.create({});

http.interceptors.request.use(request => {
    const token = AuthService.getToken();

    if (token != null) {
        request.headers.Authorization = `${ token }`;
    }

    return request;
}, err => {
    return Promise.reject(err);
});

http.interceptors.response.use(response => response, error => {
    if (error && error.response && error.response.status === 401) {
        History.push('/login');
        AuthService.removeToken();
    }

    return Promise.reject(error);
});

export default http;