import { Map } from "immutable";
import { GET_GROUP_REQUEST, GET_GROUP_SUCCESS, GET_GROUP_ERROR, ADD_GROUP_REQUEST, ADD_GROUP_SUCCESS, ADD_GROUP_ERROR } from "../actions/groups";

const initialState = Map({
    loading: false,
    error: null,
    groups: null,
    inserted_group: null,
    totalGrps: 0,
    status: 0,
    message: null,
});

const actionMap = {
    [GET_GROUP_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            error: null,
            groups: null,
            status: 0,
            message: null,
        }));
    },
    [GET_GROUP_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: null,
            groups: action.data.data.results.groups,
            totalGrps: action.data.data.results.total,
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
            ...initialState,
            loading: false,
            error: error,
            groups: action.data.data.groups,
            status: true,
            message: action.data.data.message,
        }));
    },
    [ADD_GROUP_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
        }));
    },
    [ADD_GROUP_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: null,
            inserted_group: action.data.data.group,
            status: action.data.data.status,
            message: action.data.data.message,
        }));
    },
    [ADD_GROUP_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            error: error,
            status: true,
            message: action.data.data.message,
        }));
    }
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}