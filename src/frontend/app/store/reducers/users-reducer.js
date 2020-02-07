import { USER_LOGIN_SUCCESS, CLEAR_USER_DATA } from '../actions/action-types'

const initalState = {
    user: null
};

export default (state = initalState, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS: {
            return {
                ...state,
                user: action.data.user
            }
        }
        case CLEAR_USER_DATA: {
            return {
                ...state,
                user: null
            }
        }
        default: {
            return state;
        }
    }
}
