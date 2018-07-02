import { fetchResource, postFormData, deleteFormData, getFormData } from "./index";
import { reactLocalStorage } from 'reactjs-localstorage';

function createCampaign(data) {   
    let newVar = reactLocalStorage.get('token', true);     
    return postFormData('promoter/campaign', data,{                            
                            'x-access-token':newVar
                        });    
}

function getActiveCampaign(data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }
    return postFormData('promoter/campaign/active', data, headers);
}

function getFutureCampaign(data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }
    return postFormData('promoter/campaign/future', data, headers);
}

function getPastCampaign(data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }
    return postFormData('promoter/campaign/past', data, headers);
}

function downloadCampaignImg(data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }
    return getFormData(`promoter/campaign/${data.key}/${data.id}/download`, '', headers);
}

function stopCampaign(data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }
    return postFormData(`promoter/campaign/stop/${data.campaign_id}`, data, headers);
}

function deleteCampaign(data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }
    return deleteFormData(`promoter/campaign/${data.campaign_id}`, data, headers);
}

function getActiveCampaignMembers(campaignId,data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }
    return postFormData(`promoter/campaign/${campaignId}`,data,headers);
}

function purchaseAllResult(campaignId,data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }
    let filter = { 'filter': data.filter }
    return postFormData(`promoter/campaign/${campaignId}/add_filtered_applied_post_to_cart`,filter,headers);
}

export default {
    createCampaign,
    getActiveCampaign,
    getFutureCampaign,
    getPastCampaign,
    downloadCampaignImg,
    stopCampaign,
    deleteCampaign,
    getActiveCampaignMembers,
    purchaseAllResult,
}
