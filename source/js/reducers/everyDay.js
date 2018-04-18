import { Map } from "immutable";
import {  
        EVERY_DAY_REQUEST,EVERY_DAY_SUCCESS,EVERY_DAY_ERROR,
        MORE_FILTER_REQUEST, MORE_FILTER_SUCCESS, MORE_FILTER_ERROR,
        FETCH_DROPDOWN_REQUEST,FETCH_DROPDOWN_SUCCESS
       } from "../actions/everyDay";

const initialState = Map({
    loading: false,
    error: null,
    users: {
        status:0,
        message:null,
        data:null,
        total:0
    },
    moreFilterData:null,
    abcd:null
});

const actionMap = {
    [EVERY_DAY_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null            
        }));
    },
    [EVERY_DAY_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: false,
            users: {
                status:action.data.data.status, 
                message:action.data.data.message, 
                data:action.data.data.results.users,
                total:action.data.data.results.total
            },
        }));
    },
    [EVERY_DAY_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        
        return state.merge(Map({
            loading: false,
            error: null,
            users: {
                status:0, 
                message:'', 
                data:[],
                total:0
            },
        }));
    },
    //----------------------------------------------------------------------------

    [MORE_FILTER_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null            
        }));
    },
    [MORE_FILTER_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: false,
            moreFilterData:action.data.data
        }));
    },
    [MORE_FILTER_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error            
        }));
    },
    //---------------------------------------------------------------------------------------

    [FETCH_DROPDOWN_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null            
        }));
    },

    [FETCH_DROPDOWN_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: false,
            abcd:['vsfsfs']
        }));
    },    
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}