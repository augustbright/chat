import { fork } from "redux-saga/effects";
import { rootSessionWatcher } from "./session";
import { watchRoomRequests } from "./room";
import { watchMessagesRequests } from "./message";
import {rootMeWatcher} from './me';

export default function* rootSaga() {
  yield fork(rootSessionWatcher);
  yield fork(watchRoomRequests);
  yield fork(watchMessagesRequests);
  yield fork(rootMeWatcher);
}
