import { fetchResource, postFormData, deleteFormData, getFormData } from "./index";
import { reactLocalStorage } from 'reactjs-localstorage';

function getCheckoutList() {
    let headers = { 'x-access-token' : localStorage.getItem('token') }                                                                                                                                                                                                                                         
    return getFormData(`promoter/cart`, '', headers);
}

export default {
    getCheckoutList,
}
