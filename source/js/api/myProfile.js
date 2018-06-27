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

function addBank(data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }                                                                                                                                                                                                                                      
    return postFormData(`promoter/wallet/add_bank_account`, data, headers);
}

function deleteBank(data) {
    let bankId = data.bankId;
    let headers = { 'x-access-token' : localStorage.getItem('token') }                                                                                                                                                                                                                                      
    return deleteFormData(`promoter/wallet/bank_account/${bankId}`, '', headers);
}

function getBankList() {
    let headers = { 'x-access-token' : localStorage.getItem('token') }                                                                                                                                                                                                                                         
    return getFormData(`promoter/wallet/bank_account`, '', headers);
}

function getWalletBal() {
    let headers = { 'x-access-token' : localStorage.getItem('token') }                                                                                                                                                                                                                                         
    return getFormData(`promoter/wallet/balance`, '', headers);
}

export default {
    editProfile,
    changePass,
    getJoinedRef,
    getRevenueRef,
    addBank,
    deleteBank,
    getBankList,
    getWalletBal,
}