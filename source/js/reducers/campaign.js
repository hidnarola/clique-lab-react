import { Map } from "immutable";
import { 
    CAMPAIGN_REQUEST, CAMPAIGN_SUCCESS, CAMPAIGN_ERROR,
    GET_ACTIVE_CAMPAIGN_REQUEST, GET_ACTIVE_CAMPAIGN_SUCCESS, GET_ACTIVE_CAMPAIGN_ERROR,
    GET_FUTURE_CAMPAIGN_REQUEST, GET_FUTURE_CAMPAIGN_SUCCESS, GET_FUTURE_CAMPAIGN_ERROR,
    GET_PAST_CAMPAIGN_REQUEST, GET_PAST_CAMPAIGN_SUCCESS, GET_PAST_CAMPAIGN_ERROR,
    STOP_CAMPAIGN_REQUEST, STOP_CAMPAIGN_SUCCESS, STOP_CAMPAIGN_ERROR,
    DELETE_CAMPAIGN_REQUEST, DELETE_CAMPAIGN_SUCCESS, DELETE_CAMPAIGN_ERROR,
} from "../actions/campaign";

const initialState = Map({
    loading: false,
    error: null,
    campaign: null,
    message: null,
    status: 0,

    activeCampaign: null,
    totalActiveCampaign: 0,

    futureCampaign: null,
    totalFutureCampaign: 0,

    pastCampaign: null,
    totalPastCampaign: 0,

    isStop: 0,
    isDelete: 0,

});

const actionMap = {
    [CAMPAIGN_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true                        
        }));
    },
    [CAMPAIGN_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,     
            error:null,       
            campaign:action.data.data
        }));
    },
    [CAMPAIGN_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error            
        }));
    },
    
    [GET_ACTIVE_CAMPAIGN_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true                        
        }));
    },
    [GET_ACTIVE_CAMPAIGN_SUCCESS]: (state, action) => {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        return state.merge(Map({
            ...initialState,
            loading: false,
            status: action.data.data.status,
            message: action.data.data.message,
            isStop: 0,
            activeCampaign: action.data.data.results[0].campaigns,
            totalActiveCampaign: action.data.data.results[0].total,
        }));
    },
    [GET_ACTIVE_CAMPAIGN_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error            
        }));
    },    
    
    [GET_FUTURE_CAMPAIGN_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true                        
        }));
    },
    [GET_FUTURE_CAMPAIGN_SUCCESS]: (state, action) => {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        return state.merge(Map({
            ...initialState,
            loading: false,
            status: action.data.data.status,
            message: action.data.data.message,
            isDelete: 0,
            futureCampaign: action.data.data.results[0].campaigns,
            totalFutureCampaign: action.data.data.results[0].total,
        }));
    },
    [GET_FUTURE_CAMPAIGN_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: error            
        }));
    },    
    
    [GET_PAST_CAMPAIGN_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true                        
        }));
    },
    [GET_PAST_CAMPAIGN_SUCCESS]: (state, action) => {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        return state.merge(Map({
            ...initialState,
            loading: false,
            status: action.data.data.status,
            message: action.data.data.message,
            pastCampaign: action.data.data.results[0].campaigns,
            totalPastCampaign: action.data.data.results[0].total,
        }));
    },
    [GET_PAST_CAMPAIGN_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: error            
        }));
    },    
    
    [STOP_CAMPAIGN_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true
        }));
    },
    [STOP_CAMPAIGN_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            isStop: action.data.data.status,
            message: action.data.data.message,
        }));
    },
    [STOP_CAMPAIGN_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: error            
        }));
    },    

    [DELETE_CAMPAIGN_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true
        }));
    },
    [DELETE_CAMPAIGN_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            isDelete: action.data.data.status,
            message: action.data.data.message,
        }));
    },
    [DELETE_CAMPAIGN_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: error            
        }));
    },    

};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}