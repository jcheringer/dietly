import axios from 'axios';
import { GET_DIET_LIST } from './action-types';

export const getDietList = () => {
    return {
        type: GET_DIET_LIST,
        promise: axios.get('/api/diet ')
    }
};