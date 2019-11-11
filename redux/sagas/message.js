import { fork, take, call, put, select } from "redux-saga/effects";
import {
  failFetchMessages,
  setMessages,
  requestFetchMessages,
  requestSendMessage,
  successSendMessage,
  failSendMessage
} from "../reducer/message";
import { selectActiveRoom } from "../selectors";
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

export function* watchRequestSendMessage() {
  while (true) {
    const {
      payload: { message, roomId }
    } = yield take(requestSendMessage);
    try {
      yield call(requestEndpoint, `/message/${roomId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: message })
      });
    } catch (error) {
      yield put(failSendMessage(error));
    }

    // update chat messages after sending
    const activeRoomId = yield select(selectActiveRoom);
    yield put(requestFetchMessages(activeRoomId));
    yield put(successSendMessage());
  }
}

export function* watchMessagesRequests() {
  yield fork(watchRequestFetchMessage);
  yield fork(watchRequestSendMessage);
}
