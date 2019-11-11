import { fork } from "redux-saga/effects";
import { watchSessionRequests } from "./session";
import { watchRoomRequests } from "./room";

export default function* rootSaga() {
  yield fork(watchSessionRequests);
  yield fork(watchRoomRequests);
}
