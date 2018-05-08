import { postFormData } from "./index";
import { reactLocalStorage } from 'reactjs-localstorage';

function getCampaign(data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }
    return postFormData('promoter/campaign/calendar', data, headers);
}

export default {
    getCampaign,
}