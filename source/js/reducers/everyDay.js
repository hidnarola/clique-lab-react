import { Map } from "immutable";
import {  
        EVERY_DAY_REQUEST,EVERY_DAY_SUCCESS,EVERY_DAY_ERROR,
        MORE_FILTER_REQUEST, MORE_FILTER_SUCCESS, MORE_FILTER_ERROR,
        FETCH_DROPDOWN_REQUEST,FETCH_DROPDOWN_SUCCESS,FETCH_DROPDOWN_ERROR,
        RESET_VALUES,FORCE_REFRESED,
        ADD_USER_ERROR,ADD_USER_REQUEST,ADD_USER_SUCCESS,
        RESET_TOTAL
        
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
    inspiredPosts: {
        status:0,
        message:null,
        data:null,
        total:0
    },
    moreFilterData:null,
    dropdownList:null,
    showDrop:false,

    userAdded:false,
    userAddedMsg: null,
    
    forceRefresh: false,
    is_get_campaign : 0,
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
            inspiredPosts: {
                status:action.data.data.status,
                message:action.data.data.message,
                data:(action.data.data.results.posts) ? action.data.data.results.posts :[],
                total:(action.data.data.results.total) ? action.data.data.results.total :0,
                
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
            inspiredPosts: {
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
            error: null,
            showDrop:false,
            is_get_campaign:0
        }));
    },

    [FETCH_DROPDOWN_SUCCESS]: (state, action) => {  
        return state.merge(Map({
            loading: false,
            error: false,
            dropdownList:action.data,
            showDrop:true,
            is_get_campaign:1
        }));
    }, 
    
    //By DM
    [FETCH_DROPDOWN_ERROR]: (state, action) => {   
        console.log('ERROROROROR>>>>',action);
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: null, // error
            dropdownList:null,
            showDrop:false,  
            is_get_campaign:1        
        }));
    }, 
    
    
    //---------------------------------------------------------------------------------------

    [RESET_VALUES]:(state,action) => {
        let resetObj = { showDrop:false};
        let resetUserVal = {
                status:0,
                message:null,
                data:null,
                total:0,
                is_get_campaign:0
            };
        if(action['data']){
            (action['data']['userAdded'] === false) ? resetObj['userAdded'] = false:'';

            (action['data']['userAddedMsg'] === null) ? resetObj['userAddedMsg'] = null:''; //
            (action['data']['error'] === null) ? resetObj['error'] = null:''; //
            
            (action['data']['userListing'] === false) ? resetObj['users']=resetUserVal:'';
        }
        return state.merge(Map(resetObj));
    },
    
    [FORCE_REFRESED]:(state,action) => {
        if(action['data']){
            // (action['data']['userAdded'] === false) ? resetObj['userAdded'] = false:'';
            // (action['data']['userListing'] === false) ? resetObj['users']=resetUserVal:'';
        }
        return state.merge(Map({
            forceRefresh: true
        }));
    },

    //---------------------------------------------------------------------------------------
    
    [ADD_USER_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            userAdded:false,
            userAddedMsg: null,
        }));
    },
    [ADD_USER_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: false,
            userAdded:true,
            userAddedMsg: action.data.message
        }));
    },
    [ADD_USER_ERROR]: (state, action) => {
        let error = 'Server Error';
        return state.merge(Map({
            loading: false,
            error: true,
            userAdded: false,
            userAddedMsg: action.error.response.data.message
        }));
    },

    [RESET_TOTAL]: (state, action) => {
        return state.merge(Map({
            users: {
                status:0, 
                message:'', 
                data:[],
                total:0 // ony form inspire submission page to every day people
            },
        }));
    },
 
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}