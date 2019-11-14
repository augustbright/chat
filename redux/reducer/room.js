import { createActions, handleActions } from "redux-actions";

const DEFAULT_STATE = {
  activeRoom: null,
  isMember: null,
  joining: false,
  loading: false,
  error: null
};

export const {
  setActiveRoom,
  requestRoomInfo,
  setRoomInfo,
  dropRoomInfo,
  failRoomInfo,
  requestJoinRoom,
  finishJoiningRoom
} = createActions({
  SET_ACTIVE_ROOM: activeRoom => ({ activeRoom }),
  REQUEST_ROOM_INFO: () => ({}),
  SET_ROOM_INFO: ({isMember}) => ({isMember}),
  DROP_ROOM_INFO: () => ({}),
  FAIL_ROOM_INFO: ({error}) => ({error}),
  REQUEST_JOIN_ROOM: () => ({}),
  FINISH_JOINING_ROOM: () => ({})
});

export default handleActions(
  {
    [setActiveRoom.toString()]: (state, {payload: {activeRoom}}) => ({
        ...state,
        activeRoom
    }),
    [requestRoomInfo.toString()]: (state) => ({
      ...state,
      loading: true
    }),
    [setRoomInfo.toString()]: (state, {payload: {isMember}}) => ({
      ...state,
      loading: false,
      error: null,
      isMember
    }),
    [dropRoomInfo.toString()]: (state) => ({
      ...state,
      loading: false,
      error: null,
      isMember: null
    }),
    [failRoomInfo.toString()]: (state, {payload: {error}}) => ({
      ...state,
      loading: false,
      error
    }),
    [requestJoinRoom.toString()]: (state) => ({
      ...state,
      joining: true
    }),
    [finishJoiningRoom.toString()]: (state) => ({
      ...state,
      joining: false,
    })
  },
  DEFAULT_STATE
);
