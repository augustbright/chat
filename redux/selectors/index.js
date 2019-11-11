import { createSelector } from "reselect";

export const selectSession = state => state.session;
export const selectSessionCookie = state => selectSession(state).cookie;
export const selectSessionInfo = state => (selectSession(state).info || {});
export const selectNickname = state => selectSessionInfo(state).nickname;
export const selectIsLoggedIn = state => !!selectNickname(state);
export const selectIsSessionLoading = state => selectSession(state).loading === true;

export const selectRoomsState = state => state.room;
export const selectRoomsList = state => selectRoomsState(state).rooms;
export const selectIsRoomsLoading = state => selectRoomsState(state).loading;
export const selectFirstRoom = state => selectRoomsList(state)[0];
export const selectActiveRoom = state => selectRoomsState(state).activeRoom;

export const selectMessageState = state => state.message;
export const selectMessageList = state => selectMessageState(state).messages;
export const selectIsMessagesLoading = state => selectMessageState(state).loading;
export const selectIsMessageSending = state => selectMessageState(state).messageSending;
