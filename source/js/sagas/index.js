import { all } from 'redux-saga/effects';
import login from 'sagas/login';
import register from 'sagas/register';
import afterRegister from 'sagas/afterRegister';
import campaign from 'sagas/campaign';

import everyday from 'sagas/everyDay';
import forgotPass from 'sagas/forgotPass';

export default function* rootSaga() {
  yield all([    
    ...login,
    ...register,
    ...afterRegister,
    ...campaign,
    ...everyday,
    ...forgotPass
  ]);
}
