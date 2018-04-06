import { all } from 'redux-saga/effects';

import peopleSagas from 'sagas/people';
import login from 'sagas/login';
import register from 'sagas/register';
import afterRegister from 'sagas/afterRegister';

export default function* rootSaga() {
  yield all([
    ...peopleSagas,
    ...login,
    ...register,
    ...afterRegister
  ]);
}
