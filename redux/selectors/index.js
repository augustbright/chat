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
export const selectIsRoomLoading = state => selectRoomsState(state).loading;
export const selectActiveRoom = state => selectRoomsState(state).activeRoom;
export const selectIsMember = state => selectRoomsState(state).isMember;
export const selectIsJoining = state => selectRoomsState(state).joining;

export const selectMessageState = state => state.message;
export const selectMessageList = state => selectMessageState(state).messages;
export const selectIsMessagesLoading = state =>
  selectMessageState(state).loading;
export const selectIsMessageSending = state =>
  selectMessageState(state).messageSending;

export const selectExploreState = state => state.explore;
export const selectExploreQuery = createSelector(
  selectExploreState,
  explore => {
    const query = explore.query || '';
    const queryStringified = String(query);
    return queryStringified.trim();  
  }
);
export const selectExploreNear = createSelector(
  selectExploreState,
  explore => !!explore.near
);
export const selectExplorePasswords = createSelector(
  selectExploreState,
  explore => !!explore.passwords
);
export const selectExploreResults = state => selectExploreState(state).results;
export const selectExploreQueryString = createSelector(
  selectExploreQuery,
  selectExploreNear,
  selectExplorePasswords,
  (query, near, passwords) => {
    const resultArray = [];
    if (query) {
      const queryEncoded = encodeURIComponent(query);
      resultArray.push(`q=${queryEncoded}`);
    }
    if (near) {
      resultArray.push(`n=1`);
    }
    if (passwords) {
      resultArray.push(`p=1`);
    }
    return resultArray.join('&');
  }
);
export const selectExploreQueryObject = createSelector(
  selectExploreQuery,
  selectExploreNear,
  selectExplorePasswords,
  (query, near, passwords) => {
    const result = {};
    if (query) {
      const queryEncoded = encodeURIComponent(query);
      result['q'] = queryEncoded;
    }
    if (near) {
      result['n'] = 1;
    }
    if (passwords) {
      result['p'] = 1;
    }
    return result;
  }
);

export const selectMembershipState = state => state.membership;
export const selectMyRooms = state => selectMembershipState(state).rooms;
export const selectMembershipLoading = state => selectMembershipState(state).rooms;