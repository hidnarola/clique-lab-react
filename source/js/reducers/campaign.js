import { Map } from "immutable";
import { 
    RESET_VALUES,
    CAMPAIGN_REQUEST, CAMPAIGN_SUCCESS, CAMPAIGN_ERROR,
    GET_ACTIVE_CAMPAIGN_REQUEST, GET_ACTIVE_CAMPAIGN_SUCCESS, GET_ACTIVE_CAMPAIGN_ERROR,
    GET_FUTURE_CAMPAIGN_REQUEST, GET_FUTURE_CAMPAIGN_SUCCESS, GET_FUTURE_CAMPAIGN_ERROR,
    GET_PAST_CAMPAIGN_REQUEST, GET_PAST_CAMPAIGN_SUCCESS, GET_PAST_CAMPAIGN_ERROR,
    DOWNLOAD_CAMPAIGN_IMG_REQUEST, DOWNLOAD_CAMPAIGN_IMG_SUCCESS, DOWNLOAD_CAMPAIGN_IMG_ERROR,
    STOP_CAMPAIGN_REQUEST, STOP_CAMPAIGN_SUCCESS, STOP_CAMPAIGN_ERROR,
    DELETE_CAMPAIGN_REQUEST, DELETE_CAMPAIGN_SUCCESS, DELETE_CAMPAIGN_ERROR,
    GET_ACTIVE_CAMPAIGN_MEM_REQUEST, GET_ACTIVE_CAMPAIGN_MEM_SUCCESS, GET_ACTIVE_CAMPAIGN_MEM_ERROR,
    PURCHASE_ALL_REQUEST, PURCHASE_ALL_SUCCESS, PURCHASE_ALL_ERROR,RESET_ALERT_MSG,RESET_DOWNLOAD
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
    filename: null,

    isStop: 0,
    isDelete: 0,

    activeCampaignMem: null,
    totalActiveCampaignMem: 0,

    alertMessage: null,
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
            loading: true,
            filename: null,                      
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
            filename: null,
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
            error: error,
            filename: null,          
        }));
    },    
    
    [GET_FUTURE_CAMPAIGN_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            filename: null,
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
            filename: null,
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
            error: error,
            filename: null,            
        }));
    },    
    
    [GET_PAST_CAMPAIGN_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            filename: null,              
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
            filename: null,
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
    
    [DOWNLOAD_CAMPAIGN_IMG_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            filename: null,
        }));
    },
    [DOWNLOAD_CAMPAIGN_IMG_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            status: action.data.data.status,
            message: action.data.data.message,
            filename: action.data.data.filename,
        }));
    },
    [DOWNLOAD_CAMPAIGN_IMG_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: error,
            filename: null,
        }));
    },    
    
    [RESET_DOWNLOAD]: (state, action) => {
        return state.merge(Map({
            filename: null,
        }));
    },    
    
    [STOP_CAMPAIGN_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            filename: null,
        }));
    },
    [STOP_CAMPAIGN_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            filename: null,
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
            filename: null,
            error: error            
        }));
    },    

    [DELETE_CAMPAIGN_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            filename: null,
        }));
    },
    [DELETE_CAMPAIGN_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            filename: null,
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
            filename: null,
            error: error            
        }));
    },    

    [GET_ACTIVE_CAMPAIGN_MEM_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            filename: null,
        }));
    },
    [GET_ACTIVE_CAMPAIGN_MEM_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            filename: null,
            status: action.data.data.status,
            message: action.data.data.message,
            isStop: 0,
            activeCampaignMem: action.data.data.campaign.campaign_user,
            totalActiveCampaignMem: action.data.data.campaign.total,
        }));
    },
    [GET_ACTIVE_CAMPAIGN_MEM_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            filename: null,
            error: error            
        }));
    },    

    [PURCHASE_ALL_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            filename: null,
        }));
    },
    [PURCHASE_ALL_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            filename: null,
            status: action.data.data.status,
            alertMessage: action.data.data.message,
        }));
    },
    [PURCHASE_ALL_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            filename: null,
            alertMessage: error
        }));
    },

    [RESET_VALUES]:(state,action) => {
        if(action['data']){
            // (action['data']['userAdded'] === false) ? resetObj['userAdded'] = false:'';            
        }
        return state.merge(Map({
            status: 0,
            message: null,
            futureCampaign: null,
            totalFutureCampaign: 0,
        }));
    },
    
    [RESET_ALERT_MSG]:(state,action) => {
        return state.merge(Map({
            alertMessage:null
        }));
    },

};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}