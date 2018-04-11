import { Map } from "immutable";
import { GET_GROUP_REQUEST, GET_GROUP_SUCCESS, GET_GROUP_ERROR } from "../actions/forgotPass";

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
        console.log(action);
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            status: true,
            message: action.data.data.message,
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