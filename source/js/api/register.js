import { fetchResource,postFormData } from "./index";
import { reactLocalStorage } from 'reactjs-localstorage';

function userRegister(data) {
    return postFormData('promoter_signup', data);
}

function afterRegisterUpdate(data){
    let newVar = reactLocalStorage.get('token', true);
    return postFormData('promoter/update_profile', data, 
                        {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'x-access-token':newVar
                        } );
}

function fetchIndustry(){
    return fetchResource('job_industry');
}

function fetchSetting(){
    let newVar = reactLocalStorage.get('token', true);
    var options = {
        method: 'GET',        
        headers:{
            'x-access-token':newVar
        }
    }
    return fetchResource('promoter/setting/video_tutorial',options);
}

export default {
    userRegister,
    afterRegisterUpdate,
    fetchIndustry,
    fetchSetting
}