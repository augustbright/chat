import { createActions, handleActions } from "redux-actions";

const DEFAULT_STATE = {
  rooms: null,
  loading: false,
  error: null
};

export const { requestMyRooms, setMyRooms, failMyRooms } = createActions({
  REQUEST_MY_ROOMS: () => ({}),
  SET_MY_ROOMS: rooms => ({ rooms }),
  FAIL_MY_ROOMS: error => ({ error })
});

export default handleActions({
    [requestMyRooms.toString()]: (state) => ({
        ...state,
        loading: true
    }),
    [setMyRooms.toString()]: (state, {payload: {rooms}}) => ({
        ...state,
        loading: false,
        error: false,
        rooms
    }),
    [failMyRooms.toString()]: (state, {payload: {error}}) => ({
        ...state,
        loading: false,
        error
    })
}, DEFAULT_STATE);
