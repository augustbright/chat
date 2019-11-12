import { createActions, handleActions } from "redux-actions";

const DEFAULT_STATE = {
  cookie: null,
  authenticated: null,
  loading: false,
  error: null
};

export const {
  setSessionCookie,
  requestSessionInfo,
  setSessionInfo,
  failSessionInfo
} = createActions({
  SET_SESSION_COOKIE: cookie => ({cookie}),
  REQUEST_SESSION_INFO: () => ({}),
  SET_SESSION_INFO: ({ authenticated }) => ({ authenticated }),
  FAIL_SESSION_INFO: error => ({ error })
});

export default handleActions({
  [setSessionCookie.toString()]: (state, {payload: {cookie}}) => ({
    ...state, 
    cookie
  }),
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