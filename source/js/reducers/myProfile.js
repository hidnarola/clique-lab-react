import { Map } from "immutable";
import { 
    EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_ERROR,
    CHANGE_PASS_REQUEST, CHANGE_PASS_SUCCESS, CHANGE_PASS_ERROR,
    RESET_VALUES
} from "../actions/myProfile";

const initialState = Map({
    loading: false,
    error: null,
    edit_profile: {
        status: 0,
        message: null,
        data: null,
    },
    change_pass: {
        status: 0,
        message: null,
        error: null,
    },
});

const actionMap = {
    [EDIT_PROFILE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            edit_profile: {
                status: 0,
                message: null,
                data: null,
            },
        }));
    },
    [EDIT_PROFILE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            edit_profile: {
                status: action.data.data.status,
                message: action.data.data.message,
                data: action.data.data.promoter,
            },
        }));
    },
    [EDIT_PROFILE_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            edit_profile: {
                status: 0,
                message: null,
                data: null,
            },
        }));
    },

    [CHANGE_PASS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            edit_profile: {
                status: 0,
                message: null,
                error: null,
            },
        }));
    },
    [CHANGE_PASS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            change_pass: {
                status: action.data.data.status,
                message: action.data.data.message,
                error: null,
            },
        }));
    },
    [CHANGE_PASS_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.data.message;
        }
        return state.merge(Map({
            loading: false,
            change_pass: {
                status: 0,
                message: null,
                error: error,
            },
        }));
    },

    [RESET_VALUES]:(state,action) => {
        let resetObj = {};
        if(action['data']){
            (action['data']['changePass'] === false) ? resetObj['change_pass'] = {status: 0, message: null, error: null} : '';
        }
        return state.merge(Map(resetObj));
    },

};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}