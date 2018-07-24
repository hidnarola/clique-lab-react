import { Map } from "immutable";
import {
    REGISTER_ERROR,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    FETCH_REGISTER_COUNTRY_REQUEST,
    FETCH_REGISTER_COUNTRY_SUCCESS,
    FETCH_REGISTER_COUNTRY_ERROR,
    RESET_VALUES_REGISTER,
    RESET_REGISTER_FULL_STATE,
    SET_EMAIL,
    RE_SEND_EMAIL_REQUEST, 
    RE_SEND_EMAIL_SUCCESS,
    RE_SEND_EMAIL_ERROR,

} from "../actions/register";

const initialState = Map({
    loading: false,
    error: null,
    user: null,
    message: null,
    status: 0,
    country: null,
    email_id:null,
    isresend:false,
});

const actionMap = {
    [REGISTER_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            error: null,
            user: null,
        }));
    },
    [REGISTER_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: null,
            user: true,
            message: action.data.data.message,
            status: action.data.data.status,
        }));
    },
    [REGISTER_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.data.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            user: JSON.stringify(action.data),
        }));
    },
    [RESET_VALUES_REGISTER]: (state, action) => {
        if (action['data']) {
            // (action['data']['userAdded'] === false) ? resetObj['userAdded'] = false:'';            
        }
        return state.merge(Map({
            status: 0, 
            message: null, 
            //errot: null,
            error:null,
        }));
    },

    // ---------------------After changes-------------------------
    [SET_EMAIL]: (state, action) => {
        return state.merge(Map({
            email_id:action.data
        }));
    },

    [RE_SEND_EMAIL_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading:true,
            isresend:false,
            error:null,
        }));
    },
    [RE_SEND_EMAIL_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading:false,
            isresend:true,
            error:null,
            message: action.data.data.message,// 23-07-2018
        }));
    },
    [RE_SEND_EMAIL_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.data.message;
        }
        return state.merge(Map({
            loading:false,
            isresend:false,
            error:error,
        }));
    },

    // country
    
    [FETCH_REGISTER_COUNTRY_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            country: null
        }));
    },
    [FETCH_REGISTER_COUNTRY_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            country: action.data.data.countries
        }));
    },
    [FETCH_REGISTER_COUNTRY_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: null,
            country: JSON.stringify(action.data),
        }));
    },
    [RESET_REGISTER_FULL_STATE]: (state, action) => {
        // return state.merge(initialState);
        return state.merge(Map({
            loading: false,
            error: null,
            user: null,
            message: null,
            status: 0,
            country: null,
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}