import { takeLatest, call, put } from 'redux-saga/effects';
import { 
    GET_MEMBERS_REQUEST, GET_MEMBERS_SUCCESS, GET_MEMBERS_ERROR, getMembersSuccess, getMembersError
} from "../../actions/admin/members";
import api from '../../api/admin/members';

function getMembers() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.data;
        try {
            const data = yield call(() => api.getMembers(dataNN));
            yield put(getMembersSuccess(data));
        } catch(error){
            yield put(getMembersError(error));
        }
    };
}

export const getMembersconst = getMembers();
export function* getMembersWatcher() { yield takeLatest(GET_MEMBERS_REQUEST, getMembersconst); }

export default [
    getMembersWatcher()
];
