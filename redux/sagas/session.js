import {fork, take, call, put} from 'redux-saga/effects';
import {requestSessionInfo, setSessionInfo, failSessionInfo} from '../reducer/session';
import {requestPath} from './common';

export function* requestSessionInfoWatcher() {
  while(true) {
    yield take(requestSessionInfo);
    try {
      const sessionResponse = yield call(requestPath, '/auth');
      const session = yield sessionResponse.json();  
      yield put(setSessionInfo(session));
    } catch (error) {
      yield put(failSessionInfo(error));
    }
  }
}

export function* rootSessionWatcher() {
  fork(requestSessionInfoWatcher);
}