import { GET_USER_SUCCESS, USER_LOGIN_SUCCESS } from '../actions/action-types'

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
        case GET_USER_SUCCESS: {
            return {
                ...state,
                user: action.data
            }
        }
        default: {
            return state;
        }
    }
}
