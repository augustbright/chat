import { fork, take, call, put } from "redux-saga/effects";
import {
  failFetchMessages,
  setMessages,
  requestFetchMessages
} from "../reducer/message";
import { requestEndpoint } from "./common";

export function* watchRequestFetchMessage() {
  while (true) {
    const {
      payload: { roomId }
    } = yield take(requestFetchMessages);
    try {
      const messageResponse = yield call(
        requestEndpoint,
        `/message/${roomId}`,
        {
          method: "GET"
        }
      );
      const messages = yield messageResponse.json();
      yield put(setMessages(messages));
    } catch (error) {
      yield put(failFetchMessages(error));
    }
  }
}

export function* watchMessagesRequests() {
  yield fork(watchRequestFetchMessage);
}
