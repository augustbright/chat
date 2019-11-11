import { INextPageContextWithSaga } from "../redux/store";
import { getSessionCookie, isomorphicEndpoint } from "./index";
import { setSessionInfo } from "../redux/reducer/session";
import { setRooms } from "../redux/reducer/room";
import { setMessages } from "../redux/reducer/message";
import { selectActiveRoom } from "../redux/selectors";

export async function initSessionInfo(context: INextPageContextWithSaga) {
  const cookie = String(getSessionCookie(context));
  const sessionInfoResponse = await fetch(isomorphicEndpoint("/session"), {
    method: "GET",
    credentials: "include",
    headers: {
      cookie
    }
  });
  const sessionInfo = await sessionInfoResponse.json();
  context.store.dispatch(setSessionInfo(sessionInfo));
}

export async function initRooms(context: INextPageContextWithSaga) {
  const cookie = String(getSessionCookie(context));
  const roomResponse = await fetch(isomorphicEndpoint("/room"), {
    method: "GET",
    credentials: "include",
    headers: {
      cookie
    }
  });
  const rooms = await roomResponse.json();
  context.store.dispatch(setRooms(rooms));
}

export async function initMessages(context: INextPageContextWithSaga) {
  const cookie = String(getSessionCookie(context));
  const roomId = selectActiveRoom(context.store.getState());

  // if no room is selected, do nothing
  if (!roomId) return;

  const messagesResponse = await fetch(
    isomorphicEndpoint(`/message/${roomId}`),
    {
      method: "GET",
      credentials: "include",
      headers: {
        cookie
      }
    }
  );
  const messages = await messagesResponse.json();
  context.store.dispatch(setMessages(messages));
}
