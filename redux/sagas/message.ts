import { fork, take, call, put, select } from "redux-saga/effects";
import {
  failFetchMessages,
  setMessages,
  requestFetchMessages,
  requestSendMessage,
  successSendMessage,
  failSendMessage,
  handleNewMessage
} from "../reducer/message";
import { requestMyRooms } from "../reducer/membership";
import { selectActiveRoom, selectMyRooms } from "../selectors";
import { requestEndpoint } from "./common";

export function* watchRequestFetchMessage() {
  while (true) {
    yield take(requestFetchMessages);
    const roomId = yield select(selectActiveRoom);
    try {
      const messages = yield call(requestEndpoint, `/message/${roomId}`, {
        method: "GET"
      });
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
    yield put(successSendMessage());
  }
}

export function* watchNewMessages() {
  while (true) {
    const {
      payload: { roomId }
    } = yield take(handleNewMessage);

    // Check if user belongs to given room
    const myRooms: Array<Record<string, any>> = yield select(selectMyRooms);
    const belongs = myRooms.some(room => room._id === roomId);

    if (belongs) {
      // Update unread counters
      yield put(requestMyRooms());
    }

    // Check if given room is active
    const activeRoom = yield select(selectActiveRoom);
    if (roomId == activeRoom) {
      // Update messages in active room
      yield put(requestFetchMessages());
    }
  }
}

export function* watchMessagesRequests() {
  yield fork(watchRequestFetchMessage);
  yield fork(watchRequestSendMessage);
  yield fork(watchNewMessages);
}
