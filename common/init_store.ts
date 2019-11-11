import { INextPageContextWithSaga } from "../redux/store";
import { getSessionCookie, isomorphicEndpoint } from "./index";
import { setSessionInfo } from "../redux/reducer/session";
import { setRooms } from "../redux/reducer/room";

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