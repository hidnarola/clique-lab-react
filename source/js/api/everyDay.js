import { getFormData,postFormData } from "./index";
import { reactLocalStorage } from 'reactjs-localstorage';

function fetchUsersNew(data){    
    
    let newVar = reactLocalStorage.get('token', true);    
    let url = 'promoter/user';
    if(data.groupId){
        url = `promoter/group/${data.groupId}/members`;
    } else if(data.campaignId){ 
        url = `promoter/campaign/${data.campaignId}`;
    }
    return postFormData(url,data,{"Content-Type": "application/json",'x-access-token':newVar});
}

function fetchMoreFilterData(){
    let newVar = reactLocalStorage.get('token', true);    
    return getFormData('promoter/filter_preference',null,{"Content-Type": "application/json",'x-access-token':newVar});
}

function fetchDropDownData(data){
    let newVar = reactLocalStorage.get('token', true);    
    let url = '';

    if(data.sendReqFor == 'add_to_campaign'){
        url = `promoter/campaign`;
    }else if(data.sendReqFor == 'add_to_group'){
        url = `promoter/group`;
    }else if(data.sendReqFor == 'campaign' || data.sendReqFor == 'cart'){
        url = `promoter/campaign/list_for_user/${data.uId}`;
    }else{
        url = `promoter/group/list_for_user/${data.uId}`;
    }
    return getFormData(
                       url,
                       null,
                       {"Content-Type": "application/json",'x-access-token':newVar}
                    );
}

function addUserData(data){
    let newVar = reactLocalStorage.get('token', true);    
    let url = '';
    
    // param1 -- Either Campaign Or Group 
    // param2 -- Either Campaign Id Or Group ID
    // Param3 -- Selected User Id
    
    if(data['param1'] == 'campaign'){
        url = `promoter/campaign/${data['param2']['value']}/add_user/${data['param3']}`;
    } else if(data['param1'] == 'cart'){
        url = `promoter/campaign/add_to_cart/${data['param2']['value']}/${data['param3']}`;
    } else{
        url = `promoter/group/${data['param2']['value']}/add_user/${data['param3']}`;        
    }

    return postFormData(
                       url,
                       null,
                       {"Content-Type": "application/json",'x-access-token':newVar}
                    );
}

export default {
    fetchUsersNew,
    fetchMoreFilterData,
    fetchDropDownData,
    addUserData 
}
