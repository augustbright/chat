import { createActions, handleActions } from "redux-actions";

const DEFAULT_STATE = {
  rooms: [],
  activeRoom: null,
  loading: false,
  error: null
};

export const {
  requestFetchRooms,
  setRooms,
  failFetchRooms,
  setActiveRoom
} = createActions({
  REQUEST_FETCH_ROOMS: () => ({}),
  SET_ROOMS: rooms => ({ rooms }),
  FAIL_FETCH_ROOMS: error => ({ error }),
  SET_ACTIVE_ROOM: activeRoom => ({ activeRoom })
});

export default handleActions(
  {
    [requestFetchRooms.toString()]: state => ({ ...state, loading: true }),
    [setRooms.toString()]: (state, { payload: { rooms } }) => ({
      ...state,
      loading: false,
      error: null,
      rooms
    }),
    [failFetchRooms.toString()]: (state, { payload: { error } }) => ({
      ...state,
      loading: false,
      rooms: [],
      error
    }),
    [setActiveRoom.toString()]: (state, {payload: {activeRoom}}) => ({
        ...state,
        activeRoom
    })
  },
  DEFAULT_STATE
);
