import { call, put, takeLatest } from 'redux-saga/effects';
import history from 'shared/utils/history';
import {
  authorize, loginRequest, authRequest, logoutRequest, unauthorize, setCsrf,
} from 'shared/redux/auth/reducer';
import pick from 'lodash/pick';
import axios from 'shared/utils/axios';
import cookie from 'js-cookie';

function* LoginUser(action) {
  try {
    const { payload } = action;
    const response = yield call(axios.request, {
      url: '/auth/login',
      data: payload,
      method: 'POST',
    });
    const user = pick(response, 'email', 'user_name');
    cookie.set('token', response.token, { expires: 360000 });
    yield put(authorize(user));
    history.push('/');
  } catch (err) {
    console.error('err: ', err);
  }
}

function* LogoutUser() {
  try {
    yield call(axios.request, {
      url: '/auth/logout',
      method: 'POST',
    });
    yield put(unauthorize());
  } catch (err) {
    console.error('err: ', err);
  }
}

function* GetUserSession() {
  try {
    const csrfResponse = yield call(axios.request, {
      url: '/auth/csrf',
    });
    yield put(setCsrf(csrfResponse));
    const response = yield call(axios.request, {
      url: '/auth/session',
    });
    const user = pick(response, 'email', 'first_name', 'last_name');
    yield put(authorize(user));
  } catch (err) {
    yield put(unauthorize());
    console.error('err: ', err);
  }
}

export default function* rootSaga() {
  yield takeLatest(loginRequest.type, LoginUser);
  yield takeLatest(authRequest.type, GetUserSession);
  yield takeLatest(logoutRequest.type, LogoutUser);
}
