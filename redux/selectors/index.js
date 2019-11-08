import { createSelector } from "reselect";

export const selectSession = store => store.session;
export const selectSessionCookie = store => selectSession(store).cookie;
export const selectSessionInfo = store => selectSession(store).info;
export const selectNickname = store => selectSessionInfo(store).nickname;