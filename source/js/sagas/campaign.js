import { takeLatest, put, call } from 'redux-saga/effects';
import { 
        CAMPAIGN_REQUEST,CAMPAIGN_SUCCESS,CAMPAIGN_ERROR, 
        campaignError,campaignSuccess,createCampaign
       } from "../actions/campaign";
import api from '../api/campaign';


function createCampaignFunc(){
    return function* (action){
        try{
            let data = yield call(() => api.createCampaign(action.data));
            console.log('===>',data);
            yield put(campaignSuccess(data));
        } catch(error){
            yield put(campaignError(error));
        }
    }
}

export function* watchCreateCampaign() {
    yield takeLatest(CAMPAIGN_REQUEST, createCampaignFunc());
}
 
export default [
    watchCreateCampaign()
]