import { GET_RECEIPT_LIST, SAVE_RECEIPT, REMOVE_RECEIPT } from './action-types';
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

export const saveReceipt = (receipt) => {
    return (dispatch) => {
        const method = receipt.id ? 'PUT' : 'POST';

        return dispatch({
            type: SAVE_RECEIPT,
            promise: axios({ url: '/api/receipt', method: method, data: receipt })
        });
    }
};

export const removeReceipt = (receiptId) => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_RECEIPT,
            promise: axios.delete(`/api/receipt/${ receiptId }`)
        })
    }
};