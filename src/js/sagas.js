import { takeEvery, call, put } from "redux-saga/effects";
import { actionTypes} from './actions';

export default function* watcherSaga() {
  yield takeEvery(actionTypes.LOG_IN, loginSaga);
}

function* loginSaga(payload) {
  try {
      console.log("saga",payload);
    yield put({ payload });
  } catch (e) {
    yield put({ type: actionTypes.FAILURE, payload: e });
  }
}