import { fork, take, call, put } from "redux-saga/effects";
import {
  requestFetchRooms,
  setRooms,
  failFetchRooms,
  requestSetActiveRoom,
  setActiveRoom
} from "../reducer/room";
import {
    requestFetchMessages
} from '../reducer/message';
import { requestEndpoint } from "./common";

export function* watchFetchRoomRequests() {
  while (true) {
    yield take(requestFetchRooms);
    try {
      const roomResponse = yield call(requestEndpoint, "/room", {
        method: "GET"
      });
      const rooms = yield roomResponse.json();
      yield put(setRooms(rooms));
    } catch (error) {
      yield put(failFetchRooms(error));
    }
  }
}

export function* watchRequestSetActiveRoom() {
  while (true) {
    const {payload: {activeRoom}} = yield take(requestSetActiveRoom);
    yield put(setActiveRoom(activeRoom));
    yield put(requestFetchMessages(activeRoom));
  }
}

export function* watchRoomRequests() {
  yield fork(watchFetchRoomRequests);
  yield fork(watchRequestSetActiveRoom);
}
