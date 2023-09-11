import { takeEvery, call, put } from "redux-saga/effects";
import moment from 'moment';
import { actionTypes} from './actions';
import helper from "../js/helper"

export default function* watcherSaga() {
  yield takeEvery(actionTypes.LOG_IN, loginSaga);
  yield takeEvery(actionTypes.LOG_OUT, logoutSaga);
  yield takeEvery(actionTypes.LOADING, loadingSaga);


  yield takeEvery(actionTypes.CHECK_LOGIN, checkLoginSaga);
  yield takeEvery(actionTypes.AUTHEN_LOGIN, authLoginSaga);
  yield takeEvery(actionTypes.TOKEN, tokenSaga);
  yield takeEvery(actionTypes.CHECK_TOKEN, checkTokenSaga);
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
      helper.storageRemove("token");
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

function* loadingSaga(payload) {
  try {
    yield put({ payload });
  } catch (e) {
    yield put({ type: actionTypes.FAILURE, payload: e });
  }
}

function* tokenSaga(payload) {
  try {
    helper.storageSave("token", payload);
    yield put({ type: actionTypes.TOKEN_SUCCESS, payload: payload });
  } catch (e) {
    yield put({ type: actionTypes.FAILURE, payload: e });
  }
}

function* checkTokenSaga() {
  try {
      const items = helper.storageGet("token");
      console.log('=======items', items.payload);
      if (items) {
          yield put({ type: actionTypes.TOKEN_SUCCESS, payload: items.payload});
      } else {
        yield put({ type: actionTypes.TOKEN_SUCCESS, payload: false});
      }
    } catch (e) {
      yield put({ type: actionTypes.FAILURE, payload: e });
    }
}