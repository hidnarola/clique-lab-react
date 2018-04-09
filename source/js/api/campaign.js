import { fetchResource,postFormData } from "./index";
import { reactLocalStorage } from 'reactjs-localstorage';

function createCampaign(data) {   
    let newVar = reactLocalStorage.get('token', true);     
    return postFormData('promoter/campaign', data,{                            
                            'x-access-token':newVar
                        });    
}

export default {
    createCampaign,    
}