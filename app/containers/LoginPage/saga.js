/* eslint-disable indent */
import { loginApi, registerUserApi, registerUserVerifyApi } from 'api/auth';
import { NOTIFICATION_TYPE_INFO } from 'components/NotificationBox';
import { push } from 'connected-react-router';
import {
  errorHappenAction,
  notificationShowAction,
} from 'containers/App/actions';
import { getUserMe } from 'containers/App/saga';
import { makeSelectUserMe } from 'containers/App/selectors';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { setAuth } from 'utils/auth';
import {
  loginAction,
  loginFailAction,
  loginSuccessAction,
  registerUserFailAction,
  registerUserSuccessAction,
  registerUserVerifyFailAction,
  registerUserVerifySuccessAction,
} from './actions';
import {
  LOGIN_ACTION,
  REGISTER_USER_ACTION,
  REGISTER_USER_VERIFY_ACTION,
} from './constants';

function* loginToServer({ username, password, firstTime }) {
  try {
    const response = yield call(loginApi, { username, password });

    setAuth({ ...response.data });

    yield getUserMe();
    const userMe = yield select(makeSelectUserMe());

    if (userMe.error) {
      throw userMe.error;
    }

    setAuth({ ...response.data, me: userMe.data });

    yield put(loginSuccessAction(response.data));
    yield put(push('/dashboard'));

    if (firstTime) {
      yield put(
        notificationShowAction(
          'گذرواژه شما همان ایمیل یا موبایل وارد شده میباشد برای تغییر به پروفایل خود مراجعه کنید',
          NOTIFICATION_TYPE_INFO,
        ),
      );
    }
  } catch (error) {
    setAuth();

    if (error.response && error.response.status === 401) {
      yield put(loginFailAction(error.response));
    } else {
      yield put(errorHappenAction(error));
    }
  }
}

function* registerUser({ params }) {
  try {
    const response = yield call(registerUserApi, params);
    yield put(registerUserSuccessAction(response.data));
  } catch (error) {
    let err = { message: 'خطایی رخ داده است' };
    if (error.response) {
      if (error.response.data) {
        err = {
          message: error.response.data.errors
            ? Object.values(error.response.data.errors)
                .map(v => v[0])
                .join('\n')
            : error.response.data.message || 'خطای سرور',
        };
      }
    }
    yield put(registerUserFailAction(err));
    yield put(errorHappenAction(err.message));
  }
}

function* registerUserVerify({ params }) {
  try {
    const response = yield call(registerUserVerifyApi, params);
    yield put(registerUserVerifySuccessAction(response.data));
    const key = Object.keys(params).filter(k => k !== 'code')[0];
    yield put(loginAction(params[key], params[key], true));
  } catch (error) {
    let err = { message: 'خطایی رخ داده است' };
    if (error.response) {
      if (error.response.data) {
        err = {
          message: error.response.data.errors
            ? Object.values(error.response.data.errors)
                .map(v => v[0])
                .join('\n')
            : error.response.data.message || 'خطای سرور',
        };
      }
    }
    yield put(registerUserVerifyFailAction(err));
    yield put(errorHappenAction(err.message));
  }
}

export default function* loginPageSaga() {
  yield takeLatest(LOGIN_ACTION, loginToServer);
  yield takeLatest(REGISTER_USER_ACTION, registerUser);
  yield takeLatest(REGISTER_USER_VERIFY_ACTION, registerUserVerify);
}
