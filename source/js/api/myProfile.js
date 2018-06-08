import { fetchResource, postFormData, deleteFormData, getFormData } from "./index";
import { reactLocalStorage } from 'reactjs-localstorage';

function editProfile(data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }
    return postFormData('promoter/update_profile', data, headers);
}

export default {
    editProfile,
}