import { all } from 'redux-saga/effects';

import peopleSagas from 'sagas/people';
import login from 'sagas/login'

export default function* rootSaga() {
  yield all([
    ...peopleSagas,    
  ]);
}
