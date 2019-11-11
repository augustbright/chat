import { fork } from "redux-saga/effects";
import { watchSessionRequests } from "./session";
import { watchRoomRequests } from "./room";
import { watchMessagesRequests } from "./message";

export default function* rootSaga() {
  yield fork(watchSessionRequests);
  yield fork(watchRoomRequests);
  yield fork(watchMessagesRequests);
}
