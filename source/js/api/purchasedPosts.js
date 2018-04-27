import { postFormData } from "./index";
import { reactLocalStorage } from 'reactjs-localstorage';

 

function fetchPurchasedPosts(data){
    let newVar = reactLocalStorage.get('token', true);
    return postFormData('promoter/campaign/purchased', data, 
                        {
                            'Content-Type': 'application/json',
                            'x-access-token':newVar
                        } );
}

export default {
    fetchPurchasedPosts
}