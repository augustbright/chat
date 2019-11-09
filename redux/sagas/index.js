import { take, call, select, put, all } from "redux-saga/effects";
import { requestSessionInfo, setSessionInfo, errorSessionInfo } from "../reducer";
import fetch from "isomorphic-fetch";
import { isomorphicEndpoint } from "../../common";
import { selectSessionCookie } from "../selectors";

function *fetchSessionInfo() {
  const cookie = yield select(selectSessionCookie);
  try {
    const sessionResponse = yield call(fetch, isomorphicEndpoint("/session"), {
      method: "GET",
      headers: {
        cookie
      }
    });
    const session = yield sessionResponse.json();  
    yield put(setSessionInfo(session));
  } catch (error) {
    yield put(errorSessionInfo(error));
  }
}

function *watchSessionRequests() {
  while (true) {
    yield take(requestSessionInfo);
    yield call(fetchSessionInfo);
  }  
}

export default function *rootSaga() {
  yield all([watchSessionRequests()]);
}
