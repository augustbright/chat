import { createActions, handleActions } from "redux-actions";

const INITIAL_STATE = {
  cookie: null,
  info: null,
  loading: false,
  error: null
};

export const {
  setCookie,
  requestSessionInfo,
  setSessionInfo,
  dropSession,
  errorSessionInfo
} = createActions({
  SET_COOKIE: cookie => ({cookie}),
  REQUEST_SESSION_INFO: () => ({}),
  SET_SESSION_INFO: info => ({ info }),
  DROP_SESSION: () => ({}),
  ERROR_SESSION_INFO: error => ({ error })
});

export default handleActions(
  {
    [setCookie.toString()]: (state, {payload: {cookie}}) => ({...state, cookie}),
    [requestSessionInfo.toString()]: state => ({ ...state, loading: true }),
    [setSessionInfo.toString()]: (state, { payload: { info } }) => ({
      ...state,
      info,
      loading: false,
      error: null
    }),
    [dropSession.toString()]: state => ({
      ...state,
      info: null,
      loading: false,
      error: false
    }),
    [errorSessionInfo.toString()]: (state, { payload: { error } }) => ({
      ...state,
      info: null,
      loading: false,
      error
    })
  },
  INITIAL_STATE
);
