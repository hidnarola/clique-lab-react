import { takeLatest, call, put } from 'redux-saga/effects';
import {
    PURCHASED_POSTS_REQUEST,PURCHASED_POSTS_SUCCESS,PURCHASED_POSTS_ERROR
} from '../actions/purchasedPosts';
import api from '../api/purchasedPosts';

//------------------------------------------------------------------------------------

function purchasedPostsFunc(){
    return function* (action) {        
        let actionData = action.data
        try {
            let data = yield call(() => api.fetchPurchasedPosts(actionData));
            const action = { type: PURCHASED_POSTS_SUCCESS,data};
            yield put(action);
        } catch (error) {
            const action = { type: PURCHASED_POSTS_ERROR, error };
            yield put(action);
        }
    };
}

export function* getPurchasedPostdata(){
    yield takeLatest(PURCHASED_POSTS_REQUEST, purchasedPostsFunc());
}

export default [    
    getPurchasedPostdata()
];
