import { getFormData,postFormData } from "./index";
import { reactLocalStorage } from 'reactjs-localstorage';

function fetchUsersNew(data){    
    
    let newVar = reactLocalStorage.get('token', true);    
    let url = 'promoter/user';
    if(data.groupId){
        url = `promoter/group/${data.groupId}/members`;
    } else if(data.campaignId){ 
        url = `promoter/campaign/${data.campaignId}`;
    } else if(data.inspired){
        url = `promoter/inspired_submission`;
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
    // Param4 -- Add filter for the bulk user add
    // param5 -- Used for bulk insert for campign or group via group member listing. It will be selected group id

    if(data['param1'] == 'add_to_campaign'){
        if(data['param5'] != ''){
            url = `promoter/campaign/${data['param2']['value']}/${data['param5']}/add_filter_result_to_campaign`;
        }else{
            url = `promoter/campaign/${data['param2']['value']}/add_filter_result_to_campaign`;
        }
    }else if(data['param1'] == 'add_to_group'){
        if(data['param5'] != ''){
            url = `promoter/group/${data['param2']['value']}/${data['param5']}/add_filter_result_to_group`;
        }else{
            url = `promoter/group/${data['param2']['value']}/add_filter_result_to_group`;
        }
    }else if(data['param1'] == 'campaign'){
        url = `promoter/campaign/${data['param2']['value']}/add_user/${data['param3']}`;
    } else if(data['param1'] == 'cart'){
        url = `promoter/campaign/add_to_cart/${data['param2']['value']}/${data['param3']}`;
    } else{
        url = `promoter/group/${data['param2']['value']}/add_user/${data['param3']}`;        
    }

    return postFormData(
                       url,
                       data['param4'],
                       {"Content-Type": "application/json",'x-access-token':newVar}
                    );
}

export default {
    fetchUsersNew,
    fetchMoreFilterData,
    fetchDropDownData,
    addUserData
}
