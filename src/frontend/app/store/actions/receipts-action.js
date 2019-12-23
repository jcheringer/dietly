import { GET_RECEIPT_LIST } from './action-types';
import axios from 'axios';

export const getReceiptList = (forceUpdate = false) => {
    return (dispatch, getState) => {
        const receiptList = getState().receipt.receiptList;

        if (receiptList && !forceUpdate) {
            return;
        }

        return dispatch({
            type: GET_RECEIPT_LIST,
            promise: axios.get('/api/receipt')
        });
    }
};