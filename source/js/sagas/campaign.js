import { takeLatest, put, call } from 'redux-saga/effects';
import { 
    CAMPAIGN_REQUEST,CAMPAIGN_SUCCESS,CAMPAIGN_ERROR, campaignError,campaignSuccess,createCampaign,
    GET_ACTIVE_CAMPAIGN_REQUEST, GET_ACTIVE_CAMPAIGN_SUCCESS, GET_ACTIVE_CAMPAIGN_ERROR, getActiveCampaign, getActiveCampaignSuccess, getActiveCampaignError,
    GET_FUTURE_CAMPAIGN_REQUEST, GET_FUTURE_CAMPAIGN_SUCCESS, GET_FUTURE_CAMPAIGN_ERROR, getFutureCampaign, getFutureCampaignSuccess, getFutureCampaignError,
    GET_PAST_CAMPAIGN_REQUEST, GET_PAST_CAMPAIGN_SUCCESS, GET_PAST_CAMPAIGN_ERROR, getPastCampaign, getPastCampaignSuccess, getPastCampaignError,
    DOWNLOAD_CAMPAIGN_IMG_REQUEST, DOWNLOAD_CAMPAIGN_IMG_SUCCESS, DOWNLOAD_CAMPAIGN_IMG_ERROR, downloadCampaignImg, downloadCampaignImgSuccess, downloadCampaignImgError,
    STOP_CAMPAIGN_REQUEST, STOP_CAMPAIGN_SUCCESS, STOP_CAMPAIGN_ERROR, stopCampaign, stopCampaignSuccess, stopCampaignError,
    DELETE_CAMPAIGN_REQUEST, DELETE_CAMPAIGN_SUCCESS, DELETE_CAMPAIGN_ERROR, deleteCampaign, deleteCampaignSuccess, deleteCampaignError,
    GET_ACTIVE_CAMPAIGN_MEM_REQUEST, GET_ACTIVE_CAMPAIGN_MEM_SUCCESS, GET_ACTIVE_CAMPAIGN_MEM_ERROR, getActiveCampaignMem, getActiveCampaignMemSuccess, getActiveCampaignMemError,
    PURCHASE_ALL_REQUEST, PURCHASE_ALL_SUCCESS, PURCHASE_ALL_ERROR, purchaseAll, purchaseAllSuccess, purchaseAllError,
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

function downloadCampaignImgFunc() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.data;
        try {
            const data = yield call(() => api.downloadCampaignImg(dataNN));
            const action = { type: DOWNLOAD_CAMPAIGN_IMG_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: DOWNLOAD_CAMPAIGN_IMG_ERROR, error };
            yield put(action);
        }
    };
}

function stopCampaignFunc() {
    return function* (action) {
        let dataNN = action.data;
        try {
            const data = yield call(() => api.stopCampaign(dataNN));
            const action = { type: STOP_CAMPAIGN_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: STOP_CAMPAIGN_ERROR, error };
            yield put(action);
        }
    };
}

function deleteCampaignFunc() {
    return function* (action) {
        let dataNN = action.data;
        try {
            const data = yield call(() => api.deleteCampaign(dataNN));
            const action = { type: DELETE_CAMPAIGN_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: DELETE_CAMPAIGN_ERROR, error };
            yield put(action);
        }
    };
}

// This function is used to get all active campaign
function getActiveCampaignMemFunc() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.data;
        try {
            const data = yield call(() => api.getActiveCampaignMembers(dataNN.campaignId,dataNN));
            const action = { type: GET_ACTIVE_CAMPAIGN_MEM_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: GET_ACTIVE_CAMPAIGN_MEM_ERROR, error };
            yield put(action);
        }
    };
}

function purchaseAllRequestFunc() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.data;
        try {
            const data = yield call(() => api.purchaseAllResult(dataNN.campaignId,dataNN));
            const action = { type: PURCHASE_ALL_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: PURCHASE_ALL_ERROR, error };
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
export function* watchDownloadCampaignImg() {
    yield takeLatest(DOWNLOAD_CAMPAIGN_IMG_REQUEST, downloadCampaignImgFunc());
}
export function* watchStopCampaign() {
    yield takeLatest(STOP_CAMPAIGN_REQUEST, stopCampaignFunc());
}
export function* watchDeleteCampaign() {
    yield takeLatest(DELETE_CAMPAIGN_REQUEST, deleteCampaignFunc());
}
export function* watchGetActiveCampaignMem() {
    yield takeLatest(GET_ACTIVE_CAMPAIGN_MEM_REQUEST, getActiveCampaignMemFunc());
}
export function* watchPurchaseAllResult() {
    yield takeLatest(PURCHASE_ALL_REQUEST, purchaseAllRequestFunc());
}

export default [
    watchCreateCampaign(),
    watchGetActiveCampaign(),
    watchGetFutureCampaign(),
    watchGetPastCampaign(),
    watchDownloadCampaignImg(),
    watchStopCampaign(),
    watchDeleteCampaign(),
    watchGetActiveCampaignMem(),
    watchPurchaseAllResult(),
]