import { fork, take, call, put, select } from "redux-saga/effects";
import {
  setActiveRoom,
  requestRoomInfo,
  setRoomInfo,
  dropRoomInfo,
  failRoomInfo,
  requestJoinRoom,
  finishJoiningRoom
} from "../reducer/room";
import { requestFetchMessages } from "../reducer/message";
import { requestEndpoint } from "./common";
import { selectActiveRoom } from "../selectors";

export function* watchRequestRoomInfo() {
  while (true) {
    yield take(requestRoomInfo);
    
    const activeRoom = yield select(selectActiveRoom);
    if (!activeRoom) {
      yield put(dropRoomInfo());
      continue;
    }
    try {
      const roomInfo = yield call(requestEndpoint, `/room/${activeRoom}`);
      yield put(setRoomInfo(roomInfo));
    } catch (error) {
      yield put(failRoomInfo(error));
    }
  }
}

export function* watchSetActiveRoom() {
  while (true) {
    yield take(setActiveRoom);
    yield put(requestFetchMessages());
    yield put(requestRoomInfo());
  }
}

export function* watchRequestJoinRoom() {
  while(true) {
    yield take(requestJoinRoom);
    const activeRoom = yield select(selectActiveRoom);
    const {isMember} = yield call(requestEndpoint, `/room/join/${activeRoom}`, {
      method: 'POST'
    });
    yield put(setRoomInfo({isMember}));
    yield put(finishJoiningRoom());
  }
}

export function* watchRoomRequests() {
  yield fork(watchRequestRoomInfo);
  yield fork(watchSetActiveRoom);
  yield fork(watchRequestJoinRoom);
}
