import Axios from 'axios';
import AuthService from './auth-service';

const http = Axios.create({});

http.interceptors.request.use(request => {
    const token = AuthService.getToken();

    if (token != null) {
        request.headers.Authorization = `${ token }`;
    }

    return request;
}, err => {
    return Promise.reject(err);
});

// http.interceptors.response.use(response => response, error => {
//     if (error && error.response && error.response.status === 401) {
//         Store.dispatch('clearUserData');
//         AuthService.removeToken();
//         Router.push('/login');
//     }
//
//     return Promise.reject(error);
// });

export default http;