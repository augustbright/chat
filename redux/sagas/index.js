import { fork } from "redux-saga/effects";
import { rootSessionWatcher } from "./session";
import { watchRoomRequests } from "./room";
import { watchMessagesRequests } from "./message";
import { rootMeWatcher } from "./me";
import { rootExploreWatcher } from "./explore";
import { rootMembershipWatcher } from "./membership";

export default function* rootSaga() {
  yield fork(rootSessionWatcher);
  yield fork(watchRoomRequests);
  yield fork(watchMessagesRequests);
  yield fork(rootMeWatcher);
  yield fork(rootExploreWatcher);
  yield fork(rootMembershipWatcher);
}
