import { all, fork } from 'redux-saga/effects';
import auth from './auth/effects';

function* rootSaga() {
  yield all([
    auth,
  ].map(fork));
}

export default rootSaga;
