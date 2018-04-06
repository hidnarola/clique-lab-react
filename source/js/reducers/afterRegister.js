import { Map } from "immutable";

import {
    AFTER_REGISTER_REQUEST, AFTER_REGISTER_SUCCESS, AFTER_REGISTER_ERROR,
    AFTER_FETCH_DATA, AFTER_FETCH_DATA_SUCCESS ,AFTER_FETCH_DATA_ERROR
} from '../actions/afterRegister';

const initialState = Map({
    loading: false,
    error: null,
    user: null,
    after_register_data:{
        videoUrl:null,
        industryList:null
    }
});

const actionMap = {
    [AFTER_REGISTER_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            user: null    
        }));
    },
    [AFTER_REGISTER_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            user: true,
        }));
    },
    [AFTER_REGISTER_ERROR]: (state, action) => {
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
    
    //-----------------------------------------------------------

    [AFTER_FETCH_DATA]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null            
        }));
    },
    [AFTER_FETCH_DATA_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            after_register_data:{
                videoUrl:action.setting.value,
                industryList:action.industryData.job_industry
            }     
        }));
    },
    [AFTER_FETCH_DATA_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: null,
            after_register_data: JSON.stringify(action.data),            
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}