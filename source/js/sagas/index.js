import { all } from 'redux-saga/effects';
import login from 'sagas/login';
import register from 'sagas/register';
import forgotPass from 'sagas/forgotPass';
import afterRegister from 'sagas/afterRegister';
import campaign from 'sagas/campaign';

import everyday from 'sagas/everyDay';
import groups from 'sagas/groups';
import checkout from 'sagas/checkout';


export default function* rootSaga() {
  yield all([    
    ...login,
    ...register,
    ...forgotPass,
    ...afterRegister,
    ...campaign,
    ...everyday,
    ...groups,
    ...checkout,
  ]);
}
