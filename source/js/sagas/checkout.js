import { takeLatest, put, call } from 'redux-saga/effects';
import { 
    GET_CHECKOUT_LIST_REQUEST, GET_CHECKOUT_LIST_SUCCESS, GET_CHECKOUT_LIST_ERROR, getCheckoutList, getCheckoutListSuccess, getCheckoutListError,
    CART_PAYMENT_REQUEST, CART_PAYMENT_SUCCESS, CART_PAYMENT_ERROR, cartPaymentReq, cartPaymentSuccess, cartPaymentError,
} from "../actions/Checkout";
import api from '../api/checkout';


function getCheckoutListFunc(){
    return function* (action){
        try{
            let data = yield call(() => api.getCheckoutList());
            yield put(getCheckoutListSuccess(data));
        } catch(error){
            yield put(getCheckoutListError(error));
        }
    }
}

function cartPaymentFunc(){
    return function* (action){
        try{
            let data = yield call(() => api.cartPayment(action.data));
            yield put(cartPaymentSuccess(data));
        } catch(error){
            yield put(cartPaymentError(error));
        }
    }
}

export function* watchGetCamapaignList() { yield takeLatest(GET_CHECKOUT_LIST_REQUEST, getCheckoutListFunc()); }
export function* watchCartPayment() { yield takeLatest(CART_PAYMENT_REQUEST, cartPaymentFunc()); }

export default [
    watchGetCamapaignList(),
    watchCartPayment(),
]