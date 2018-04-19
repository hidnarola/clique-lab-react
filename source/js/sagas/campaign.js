import { takeLatest, put, call } from 'redux-saga/effects';
import { 
    CAMPAIGN_REQUEST,CAMPAIGN_SUCCESS,CAMPAIGN_ERROR, campaignError,campaignSuccess,createCampaign,
    GET_ACTIVE_CAMPAIGN_REQUEST, GET_ACTIVE_CAMPAIGN_SUCCESS, GET_ACTIVE_CAMPAIGN_ERROR, getActiveCampaign, getActiveCampaignSuccess, getActiveCampaignError,
    GET_FUTURE_CAMPAIGN_REQUEST, GET_FUTURE_CAMPAIGN_SUCCESS, GET_FUTURE_CAMPAIGN_ERROR, getFutureCampaign, getFutureCampaignSuccess, getFutureCampaignError,
    GET_PAST_CAMPAIGN_REQUEST, GET_PAST_CAMPAIGN_SUCCESS, GET_PAST_CAMPAIGN_ERROR, getPastCampaign, getPastCampaignSuccess, getPastCampaignError,
} from "../actions/campaign";
import api from '../api/campaign';


function createCampaignFunc(){
    return function* (action){
        try{
            let data = yield call(() => api.createCampaign(action.data));
            yield put(campaignSuccess(data));
        } catch(error){
            yield put(campaignError(error));
        }
    }
}

// This function is used to get all active campaign
function getActiveCampaignFunc() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.data;
        try {
            const data = yield call(() => api.getActiveCampaign(dataNN));
            const action = { type: GET_ACTIVE_CAMPAIGN_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: GET_ACTIVE_CAMPAIGN_ERROR, error };
            yield put(action);
        }
    };
}

// This function is used to get all active campaign
function getFutureCampaignFunc() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.data;
        try {
            const data = yield call(() => api.getFutureCampaign(dataNN));
            const action = { type: GET_FUTURE_CAMPAIGN_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: GET_FUTURE_CAMPAIGN_ERROR, error };
            yield put(action);
        }
    };
}

function getPastCampaignFunc() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.data;
        try {
            const data = yield call(() => api.getPastCampaign(dataNN));
            const action = { type: GET_PAST_CAMPAIGN_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: GET_PAST_CAMPAIGN_ERROR, error };
            yield put(action);
        }
    };
}


export function* watchCreateCampaign() {
    yield takeLatest(CAMPAIGN_REQUEST, createCampaignFunc());
}

export function* watchGetActiveCampaign() {
    yield takeLatest(GET_ACTIVE_CAMPAIGN_REQUEST, getActiveCampaignFunc());
}
 
export function* watchGetFutureCampaign() {
    yield takeLatest(GET_FUTURE_CAMPAIGN_REQUEST, getFutureCampaignFunc());
}

export function* watchGetPastCampaign() {
    yield takeLatest(GET_PAST_CAMPAIGN_REQUEST, getPastCampaignFunc());
}

export default [
    watchCreateCampaign(),
    watchGetActiveCampaign(),
    watchGetFutureCampaign(),
    watchGetPastCampaign()
]