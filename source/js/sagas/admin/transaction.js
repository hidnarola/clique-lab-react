import { takeLatest, call, put } from 'redux-saga/effects';
import { 
    GET_TRANSACTION_REQUEST, GET_TRANSACTION_SUCCESS, GET_TRANSACTION_ERROR, getTransactionSuccess, getTransactionError
} from "../../actions/admin/transaction";
import api from '../../api/admin/transaction';

// This function is used to get all transaction
function getTransaction() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.data;
        try {
            const data = yield call(() => api.getTransaction(dataNN));
            yield put(getTransactionSuccess(data));
        } catch(error){
            yield put(getTransactionError(error));
        }
    };
}

export const getTransactionconst = getTransaction();
export function* getTransactionWatcher() { yield takeLatest(GET_TRANSACTION_REQUEST, getTransactionconst); }

export default [
    getTransactionWatcher()
];
