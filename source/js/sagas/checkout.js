import { takeLatest, put, call } from 'redux-saga/effects';
import { 
    GET_CHECKOUT_LIST_REQUEST, GET_CHECKOUT_LIST_SUCCESS, GET_CHECKOUT_LIST_ERROR, getCheckoutList, getCheckoutListSuccess, getCheckoutListError,
} from "../actions/checkout";
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

export function* watchGetCamapaignList() {
    yield takeLatest(GET_CHECKOUT_LIST_REQUEST, getCheckoutListFunc());
}

export default [
    watchGetCamapaignList(),
]