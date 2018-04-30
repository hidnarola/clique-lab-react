import { Map } from "immutable";
import {
        PURCHASED_POSTS_REQUEST,
        PURCHASED_POSTS_SUCCESS,
        PURCHASED_POSTS_ERROR
       } from "../actions/purchasedPosts";

const initialState = Map({
    loading: false,
    error: null,
    allPosts: null,
    total:0
});

const actionMap = {
    [PURCHASED_POSTS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            allPosts: null
        }));
    },
    [PURCHASED_POSTS_SUCCESS]: (state, action) => {
        console.log('=====================');
        console.log(action);        
        console.log('=====================');

        return state.merge(Map({
            loading: false,
            error: null,
            allPosts: action.data.data.results.results,
            total: action.data.data.results.total,
        }));
    },
    [PURCHASED_POSTS_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: true,
            allPosts: null,
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}