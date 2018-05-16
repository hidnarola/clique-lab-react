import { Map } from "immutable";
import {
            REGISTER_ERROR,
            REGISTER_REQUEST,
            REGISTER_SUCCESS,
            FETCH_REGISTER_COUNTRY_REQUEST,
            FETCH_REGISTER_COUNTRY_SUCCESS,
            FETCH_REGISTER_COUNTRY_ERROR,
            RESET_VALUES_REGISTER,
        } from "../actions/register";

const initialState = Map({
    loading: false,
    error: null,
    user: null,
    message: null,
    status: 0,
    country: null,
});

const actionMap = {
    [REGISTER_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            error: null,
            user: null
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
    [RESET_VALUES_REGISTER]:(state,action) => {        
        if(action['data']){
            // (action['data']['userAdded'] === false) ? resetObj['userAdded'] = false:'';            
        }
        return state.merge(Map({
            errot: null
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




};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}