import { INextPageContextWithSaga } from "../redux/store";
import { setSessionInfo, setSessionCookie } from "../redux/reducer/session";
import { setRooms } from "../redux/reducer/room";
import { setMessages } from "../redux/reducer/message";
import { setInfoOnMe } from "../redux/reducer/me";
import { selectActiveRoom, selectSessionAuthenticated } from "../redux/selectors";
import { requestForStore, getSessionCookie } from "./isomorphic";

export function initSessionCookie(context: INextPageContextWithSaga) {
  const sessionCookie = getSessionCookie(context);
  context.store.dispatch(setSessionCookie(sessionCookie));
}

export async function initInfoOnMe(context: INextPageContextWithSaga) {
  //Fetch current user's profile info if user is authenticated
  if (selectSessionAuthenticated(context.store.getState())) {
    await requestForStore(context, "/me", setInfoOnMe);
  }
}

export async function initSessionInfo(context: INextPageContextWithSaga) {
  await requestForStore(context, "/session", setSessionInfo);
}

export async function initRooms(context: INextPageContextWithSaga) {
  await requestForStore(context, "/room", setRooms);
}

export async function initMessages(context: INextPageContextWithSaga) {
  const roomId = selectActiveRoom(context.store.getState());

  // if no room is selected, do nothing
  if (!roomId) return;

  await requestForStore(context, `/message/${roomId}`, setMessages);
}
