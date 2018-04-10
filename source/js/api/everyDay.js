import { getFormData,postFormData } from "./index";
import { reactLocalStorage } from 'reactjs-localstorage';

function fetchUsersNew(data){
    
    let newVar = reactLocalStorage.get('token', true);

    
    return postFormData('promoter/user',data,{"Content-Type": "application/json",'x-access-token':newVar});
    
}

export default {
    fetchUsersNew,    
}
