import { fetchResource,postFormData } from "./index";
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
    return postFormData('promoter/campaign/active', data, headers);
}

function getPastCampaign(data) {
    let headers = {
      'x-access-token' : localStorage.getItem('token')
    }
    return postFormData('promoter/campaign/active', data, headers);
}

export default {
    createCampaign,
    getActiveCampaign,
    getFutureCampaign,
    getPastCampaign
}
