import { fetchResource, postFormData, deleteFormData, getFormData } from "./index";
import { reactLocalStorage } from 'reactjs-localstorage';

function editProfile(data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }
    return postFormData('promoter/update_profile', data, headers);
}

function changePass(data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }
    return postFormData('promoter/change_password', data, headers);
}

function getJoinedRef(data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }
    return postFormData('promoter/referral/referral_view', data, headers);
}

function getRevenueRef(data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }
    return postFormData('promoter/referral/referral_revenue', data, headers);
}

export default {
    editProfile,
    changePass,
    getJoinedRef,
    getRevenueRef,
}