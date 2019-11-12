import { createSelector } from "reselect";

export const selectSessionState = state => state.session;
export const selectSessionCookie = state => selectSessionState(state).cookie;
export const selectSessionAuthenticated = state =>
  selectSessionState(state).authenticated;
export const selectSessionUnauthenticated = state =>
  !selectSessionAuthenticated(state);
export const selectIsSessionLoading = state =>
  selectSessionState(state).loading === true;

export const selectMeState = state => state.me;
export const selectInfoOnMe = state => selectMeState(state).info;
export const selectHasInfoOnMe = state => !!selectInfoOnMe(state);
export const selectMeLoading = state => selectMeState(state).loading;
export const selectMyNickname = createSelector(
  selectHasInfoOnMe,
  selectInfoOnMe,
  (hasInfo, info) => (hasInfo ? info.nickname : null)
);

export const selectRoomsState = state => state.room;
export const selectRoomsList = state => selectRoomsState(state).rooms;
export const selectIsRoomsLoading = state => selectRoomsState(state).loading;
export const selectFirstRoom = state => selectRoomsList(state)[0];
export const selectActiveRoom = state => selectRoomsState(state).activeRoom;

export const selectMessageState = state => state.message;
export const selectMessageList = state => selectMessageState(state).messages;
export const selectIsMessagesLoading = state =>
  selectMessageState(state).loading;
export const selectIsMessageSending = state =>
  selectMessageState(state).messageSending;
