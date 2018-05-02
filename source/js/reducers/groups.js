import { Map } from "immutable";
import { GET_GROUP_REQUEST, GET_GROUP_SUCCESS, GET_GROUP_ERROR, ADD_GROUP_REQUEST, ADD_GROUP_SUCCESS, ADD_GROUP_ERROR, GROUP_MEMBERS_REQUEST, 
    GROUP_MEMBERS_SUCCESS, GROUP_MEMBERS_ERROR,RESET_GROUP_VALUES } from "../actions/groups";

const initialState = Map({
    loading: false,
    error: null,
    status: 0,
    message: null,

    groups: null,
    
    inserted_group: null,
    totalGrps: 0,
    
    members: null,
    totalMembers: 0,
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
            groups: null,
            status: true,
            message: action.error.message,
        }));
    },
    [ADD_GROUP_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            status:0
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
    },
    [GROUP_MEMBERS_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
        }));
    },
    [GROUP_MEMBERS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            members: action.data.data.results.members,
            totalMembers: action.data.data.results.total,
        }));
    },
    [GROUP_MEMBERS_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: error,
            groups: null,
            status: true,
            message: action.error.message,
        }));
    },

    [RESET_GROUP_VALUES]:(state,action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: null,
            inserted_group: null,
            status: 0,
            message: null,
        }));
    },

};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}