import { fetchResource,postFormData,deleteFormData } from "./index";
import { reactLocalStorage } from 'reactjs-localstorage';

function createCampaign(data) {   
    let newVar = reactLocalStorage.get('token', true);     
    return postFormData('promoter/campaign', data,{                            
                            'x-access-token':newVar
                        });    
}

function getActiveCampaign(data) {
    let headers = {
      'x-access-token' : localStorage.getItem('token')
    }
    return postFormData('promoter/campaign/active', data, headers);
}

function getFutureCampaign(data) {
    let headers = {
      'x-access-token' : localStorage.getItem('token')
    }
    return postFormData('promoter/campaign/future', data, headers);
}

function getPastCampaign(data) {
    let headers = { 
      'x-access-token' : localStorage.getItem('token')
    }
    return postFormData('promoter/campaign/past', data, headers);
}

function stopCampaign(data) {
    let headers = { 
      'x-access-token' : localStorage.getItem('token')
    }
    return postFormData(`promoter/campaign/stop/${data.campaign_id}`, data, headers);
}

function deleteCampaign(data) {
    let headers = { 
      'x-access-token' : localStorage.getItem('token')
    }
    return deleteFormData(`promoter/campaign/${data.campaign_id}`, data, headers);
}

export default {
    createCampaign,
    getActiveCampaign,
    getFutureCampaign,
    getPastCampaign,
    stopCampaign,
    deleteCampaign
}
