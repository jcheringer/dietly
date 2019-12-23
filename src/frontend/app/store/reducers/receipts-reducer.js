import { GET_RECEIPT_LIST_SUCCESS } from '../actions/action-types';

const initialState = {
    receiptList: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_RECEIPT_LIST_SUCCESS: {
            return {
                ...state,
                receiptList: action.data
            }
        }
        default: {
            return state
        }
    }
}