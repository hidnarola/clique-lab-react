import { all } from 'redux-saga/effects';
import login from 'sagas/login';
import register from 'sagas/register';
import afterRegister from 'sagas/afterRegister';
import campaign from 'sagas/campaign';

export default function* rootSaga() {
  yield all([    
    ...login,
    ...register,
    ...afterRegister,
    ...campaign
  ]);
}
