import { fetchResource, postFormData, deleteFormData, getFormData } from "./index";
import { reactLocalStorage } from 'reactjs-localstorage';

function getCheckoutList() {
    let headers = { 'x-access-token' : localStorage.getItem('token') }                                                                                                                                                                                                                                         
    return getFormData(`promoter/cart`, '', headers);
}

function removeCartItems(item_id) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }                                                                                                                                                                                                                                         
    return deleteFormData(`promoter/cart/${item_id}`, '', headers);
}

function addCard(data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }                                                                                                                                                                                                                                      
    return postFormData(`promoter/wallet/credit_card`, data, headers);
}

function getCardList() {
    let headers = { 'x-access-token' : localStorage.getItem('token') }                                                                                                                                                                                                                                         
    return getFormData(`promoter/wallet/cards`, '', headers);
}

function cartPayment(data) {
    let headers = { 'x-access-token' : localStorage.getItem('token') }                                                                                                                                                                                                                                         
    return postFormData(`promoter/cart/purchase`, data, headers);
}

export default {
    getCheckoutList,
    removeCartItems,
    addCard,
    getCardList,
    cartPayment,
}
