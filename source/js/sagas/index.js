import { all } from 'redux-saga/effects';
import login from 'sagas/login';
import register from 'sagas/register';
import forgotPass from 'sagas/forgotPass';
import afterRegister from 'sagas/afterRegister';
import campaign from 'sagas/campaign';

import everyday from 'sagas/everyDay';
import groups from 'sagas/groups';
import checkout from 'sagas/checkout';
import purchasedPosts from 'sagas/purchasedPosts';
import calendar from 'sagas/calendar';
import analytics from 'sagas/analytics';
import myProfile from 'sagas/myProfile';

import adminTransaction from 'sagas/admin/transaction';


export default function* rootSaga() {
  yield all([    
    ...purchasedPosts,
    ...login,
    ...register,
    ...forgotPass,
    ...afterRegister,
    ...campaign,
    ...everyday,
    ...groups,
    ...checkout,
    ...calendar,
    ...analytics,
    ...myProfile,
    ...adminTransaction,
  ]);
}
