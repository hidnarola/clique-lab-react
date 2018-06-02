import { postFormData } from "./index";
import { reactLocalStorage } from 'reactjs-localstorage';

function getAnalytics(data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }
    return postFormData('promoter/get_analytics', data, headers);
}

function getSocialAnalytics(data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }
    return postFormData('promoter/get_social_analytics', data, headers);
}

export default {
    getAnalytics,
    getSocialAnalytics
}