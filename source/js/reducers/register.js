import { Map } from "immutable";
import {
            REGISTER_ERROR,
            REGISTER_REQUEST,
            REGISTER_SUCCESS,
            FETCH_REGISTER_COUNTRY_REQUEST,
            FETCH_REGISTER_COUNTRY_SUCCESS,
            FETCH_REGISTER_COUNTRY_ERROR
        } from "../actions/register";

const initialState = Map({
    loading: false,
    error: null,
    user: null,
    country: null,
});

const actionMap = {
    [REGISTER_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            user: null
        }));
    },
    [REGISTER_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            user: true,
        }));
    },
    [REGISTER_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: null,
            user: JSON.stringify(action.data),
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
            //country: true,
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