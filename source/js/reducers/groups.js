import { Map } from "immutable";
import { GET_GROUP_REQUEST, GET_GROUP_SUCCESS, GET_GROUP_ERROR } from "../actions/groups";

const initialState = Map({
    loading: false,
    error: null,
    groups: null,
    status: 0,
    message: null,
});

const actionMap = {
    [GET_GROUP_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            groups: null,
            status: 0,
            message: null,
        }));
    },
    [GET_GROUP_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            groups: action.data,
            status: 0,
            message: null,
        }));
    },
    [GET_GROUP_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            groups: action.data.data.groups,
            status: true,
            message: action.data.data.message,
        }));
    }
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}