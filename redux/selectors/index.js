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
export const selectActiveRoom = state => selectRoomsState(state).activeRoom;