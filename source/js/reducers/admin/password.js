import { Map } from "immutable";
import {
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR,
    RESET_VALUES_FORGOT
} from "../../actions/admin/password";

const initialState = Map({
    forgotPassword: {
        loading: false,
        error: null,
        status: 0,
        message: null,
    },
    resetPassword: {
        loading: false,
        error: null,
        status: 0,
        message: null,
    }
});

const actionMap = {
    [FORGOT_PASSWORD_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            forgotPassword: {
                loading: true,
                error: null,
                status: 0,
                message: null,
            }
        }));
    },
    [FORGOT_PASSWORD_SUCCESS]: (state, action) => {

        return state.merge(Map({
            ...initialState,
            forgotPassword: {
                loading: false,
                status: action.data.data.status,
                message: action.data.data.message,
                error: null,
            }
        }));
    },
    [FORGOT_PASSWORD_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            forgotPassword: {
                loading: false,
                error: error,
                status: 0,
                message: null,
            }
        }));
    },
    [RESET_PASSWORD_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            resetPassword: {
                loading: true,
                error: null,
                status: 0,
                message: null,
            }
        }));
    },
    [RESET_PASSWORD_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            resetPassword: {
                loading: false,
                status: action.data.data.status,
                message: action.data.data.message,
                error: null,
            }
        }));
    },
    [RESET_PASSWORD_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            resetPassword: {
                loading: false,
                error: error,
                status: 0,
                message: null,
            }
        }));
    },

    [RESET_VALUES_FORGOT]:(state,action) => {        
        if(action['data']){
            // (action['data']['userAdded'] === false) ? resetObj['userAdded'] = false:'';            
        }
        return state.merge(Map({
            forgotPassword: {
                loading: false,
                error: null,
                status: 0,
                message: null,
            },
            resetPassword: {
                loading: false,
                error: null,
                status: 0,
                message: null,
            }
        }));
    },

};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}