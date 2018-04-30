import { Map } from "immutable";
import { FORGOT_REQUEST, FORGOT_SUCCESS, FORGOT_ERROR, RESET_REQUEST, RESET_SUCCESS, RESET_ERROR } from "../actions/forgotPass";

const initialState = Map({
    loading: false,
    error: null,
    token: null,
    status: 0,
    message: null,
});

const actionMap = {
    [FORGOT_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            token: null,
            status: 0,
            message: null,
        }));
    },
    [FORGOT_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            status: action.data.data.status,
            message: action.data.data.message,
        }));
    },
    [FORGOT_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response.data.message) {
            error = action.error.response.data.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            status: 0,
        }));
    },
    [RESET_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            token: null,
            message: null,
        }));
    },
    [RESET_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            status: action.data.data.status,
            message: action.data.data.message,
        }));
    },
    [RESET_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            status: 0,
            message: null,
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}