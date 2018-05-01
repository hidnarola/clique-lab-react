import { fetchResource, postFormData, deleteFormData, getFormData } from "./index";
import { reactLocalStorage } from 'reactjs-localstorage';

function getCheckoutList() {
    let headers = { 'x-access-token' : localStorage.getItem('token') }                                                                                                                                                                                                                                         
    return getFormData(`promoter/cart`, '', headers);
}

function cartPayment(data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }                                                                                                                                                                                                                                         
    return postFormData(`promoter/cart/purchase`, data, headers);
}

export default {
    getCheckoutList,
    cartPayment,
}
