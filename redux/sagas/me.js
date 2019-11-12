import { fork, take, call, put } from "redux-saga/effects";
import {
  failInfoOnMe,
  requestInfoOnMe,
  setInfoOnMe,
  requestSetInfoOnMe
} from "../reducer/me";
import {requestEndpoint} from './common';

export function* requestSetInfoOnMeWatcher() {
    while(true) {
        const infoOnMe = yield take(requestSetInfoOnMe);
        try {
            yield call(requestEndpoint, "/me", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(infoOnMe)
            });
        } catch (error) {
            continue;
        }
        yield put(requestInfoOnMe());
    }
}

export function* requestInfoOnMeWatcher() {
  while (true) {
    yield take(requestInfoOnMe);
    try {
        const meResponse = yield call(requestEndpoint, "/me");
        const infoOnMe = yield call([meResponse, 'json']);
        yield put(setInfoOnMe(infoOnMe));
    } catch (error) {
        yield put(failInfoOnMe(error));
    }
  }
}

export function* rootMeWatcher() {
  yield fork(requestInfoOnMeWatcher);
  yield fork(requestSetInfoOnMeWatcher);
}
