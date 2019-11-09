import { take, call, put, fork } from "redux-saga/effects";
import {
  requestSessionInfo,
  setSessionInfo,
  errorSessionInfo,
  postSessionInfo,
  requestDropSession,
  dropSession
} from "../reducer";
import Router from "next/router";
import { requestEndpoint } from "./common";

function* fetchSessionInfo() {
  try {
    const sessionResponse = yield requestEndpoint("/session", {
      method: "GET"
    });
    const session = yield sessionResponse.json();
    yield put(setSessionInfo(session));
  } catch (error) {
    yield put(errorSessionInfo(error));
  }
}

function* postSession(info) {
  try {
    yield requestEndpoint("/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    });
    yield put(setSessionInfo(info));
    Router.push("/");
  } catch (error) {
    yield put(errorSessionInfo(error));
  }
}

function* dropSessionSaga() {
  try {
    yield requestEndpoint("/session", {
      method: "DELETE"
    });
    yield put(dropSession());
    Router.push("/welcome");
  } catch (error) {}
}

export function* watchPostSession() {
  while (true) {
    const {
      payload: { info }
    } = yield take(postSessionInfo);
    yield postSession(info);
  }
}

export function* watchRequestSessionInfo() {
  while (true) {
    yield take(requestSessionInfo);
    yield call(fetchSessionInfo);
  }
}

export function* watchDropSession() {
  while (true) {
    yield take(requestDropSession);
    yield call(dropSessionSaga)
  }
}

export function* watchSessionRequests() {
  yield fork(watchPostSession);
  yield fork(watchRequestSessionInfo);
  yield fork(watchDropSession);
}
