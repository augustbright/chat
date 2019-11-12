import { createActions, handleActions } from "redux-actions";

const DEFAULT_STATE = {
  authenticated: null,
  loading: false,
  error: null
};

export const {
  requestSessionInfo,
  setSessionInfo,
  failSessionInfo
} = createActions({
  REQUEST_SESSION_INFO: () => ({}),
  SET_SESSION_INFO: ({ authenticated }) => ({ authenticated }),
  FAIL_SESSION_INFO: error => ({ error })
});

export default handleActions({
  [requestSessionInfo.toString()]: (state) => ({
    ...state,
    loading: true
  }),
  [setSessionInfo.toString()]: (state, {payload: {authenticated}}) => ({
    ...state,
    authenticated,
    loading: false,
    error: null
  }),
  [failSessionInfo.toString()]: (state, {payload: {error}}) => ({
    ...state,
    loading: false,
    error
  })
}, DEFAULT_STATE);