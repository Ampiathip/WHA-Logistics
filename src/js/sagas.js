import { takeEvery, call, put } from "redux-saga/effects";
import moment from 'moment';
import { actionTypes} from './actions';
import helper from "../js/helper"

export default function* watcherSaga() {
  yield takeEvery(actionTypes.LOG_IN, loginSaga);
  yield takeEvery(actionTypes.LOG_OUT, logoutSaga);

  yield takeEvery(actionTypes.CHECK_LOGIN, checkLoginSaga);
  yield takeEvery(actionTypes.AUTHEN_LOGIN, authLoginSaga);
}

function* loginSaga(payload) {
  try {
    let saveData = Object.assign({}, {}, payload.payload);
    saveData.token = helper.encryptData(payload.payload.token)
    helper.storageSave("login", saveData);
    yield put({ type: actionTypes.LOG_IN_SUCCESS, payload: saveData });
  } catch (e) {
    yield put({ type: actionTypes.FAILURE, payload: e });
  }
}

function* logoutSaga(payload) {
  try {
      console.log("logout ", payload);
      helper.storageRemove("login");
      window.location.href = '/';
      yield put({ type: actionTypes.LOG_OUT_SUCCESS, payload: false});
  } catch (e) {
      yield put({ type: actionTypes.FAILURE, payload: e });
  }
}

function* checkLoginSaga() {
  try {
      const items = helper.storageGet("login");
      if (items) {
          const loginDate = moment(items.lastLoginDate);
          const today = moment().utc();
          if (today.diff(loginDate, 'hours') >= 6){
              yield put({ type: actionTypes.LOG_IN_SUCCESS, payload: false});
          } else {
              yield put({ type: actionTypes.LOG_IN_SUCCESS, payload: items});
          }
      } else {
          yield put({ type: actionTypes.LOG_IN_SUCCESS, payload: false});
      }
  } catch (e) {
      yield put({ type: actionTypes.FAILURE, payload: e });
  }
}

function* authLoginSaga() {
  try {
      const items = helper.storageGet("login");
      if (items) {
          yield put({ type: actionTypes.LOG_IN_SUCCESS, payload: items});
      } else {
          window.location.href = '/';
          yield put({ type: actionTypes.LOG_OUT_SUCCESS, payload: false});
      }
    } catch (e) {
      yield put({ type: actionTypes.FAILURE, payload: e });
    }
}