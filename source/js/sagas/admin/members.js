import { takeLatest, call, put } from 'redux-saga/effects';
import { 
    GET_MEMBERS_REQUEST, GET_MEMBERS_SUCCESS, GET_MEMBERS_ERROR, getMembersSuccess, getMembersError,
    REMOVE_MEMBERS_REQUEST, REMOVE_MEMBERS_SUCCESS, REMOVE_MEMBERS_ERROR, removeMembersSuccess, removeMembersError,
    SUSPEND_MEMBERS_REQUEST, SUSPEND_MEMBERS_SUCCESS, SUSPEND_MEMBERS_ERROR, suspendMembersSuccess, suspendMembersError,
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

function removeMembers() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.data;
        try {
            const data = yield call(() => api.removeMembers(dataNN));
            yield put(removeMembersSuccess(data));
        } catch(error){
            yield put(removeMembersError(error));
        }
    };
}

function suspendMembers() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.data;
        try {
            const data = yield call(() => api.suspendMembers(dataNN));
            yield put(suspendMembersSuccess(data));
        } catch(error){
            yield put(suspendMembersError(error));
        }
    };
}

export const getMembersconst = getMembers();
export const removeMembersconst = removeMembers();
export const suspendMembersconst = suspendMembers();

export function* getMembersWatcher() { yield takeLatest(GET_MEMBERS_REQUEST, getMembersconst); }
export function* removeMembersWatcher() { yield takeLatest(REMOVE_MEMBERS_REQUEST, removeMembersconst); }
export function* suspendMembersWatcher() { yield takeLatest(SUSPEND_MEMBERS_REQUEST, suspendMembersconst); }

export default [
    getMembersWatcher(),
    removeMembersWatcher(),
    suspendMembersWatcher()
];
