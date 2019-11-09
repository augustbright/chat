import { fork } from "redux-saga/effects";
import { watchSessionRequests } from "./session";

export default function* rootSaga() {
  yield fork(watchSessionRequests);
}
