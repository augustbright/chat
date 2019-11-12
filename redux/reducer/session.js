import { createActions, handleActions } from "redux-actions";

const INITIAL_STATE = {
  cookie: null,
  info: null,
  loading: false,
  error: null
};

export const {
  requestSessionInfo,
  postSessionInfo,
  setSessionInfo,
  requestDropSession,
  dropSession,
  errorSessionInfo
} = createActions({
  SET_COOKIE: cookie => ({ cookie }),
  REQUEST_SESSION_INFO: () => ({}),
  POST_SESSION_INFO: info => ({ info }),
  SET_SESSION_INFO: info => ({ info }),
  REQUEST_DROP_SESSION: () => ({}),
  DROP_SESSION: () => ({}),
  ERROR_SESSION_INFO: error => ({ error })
});

export default handleActions(
  {
    [setCookie.toString()]: (state, { payload: { cookie } }) => ({
      ...state,
      cookie
    }),
    [requestSessionInfo.toString()]: state => ({ ...state, loading: true }),
    [postSessionInfo.toString()]: (state, {payload: { info }}) => ({
      ...state,
      loading: true
    }),
    [setSessionInfo.toString()]: (state, { payload: { info } }) => ({
      ...state,
      info,
      loading: false,
      error: null
    }),
    [requestDropSession.toString()]: state => ({
      ...state,
      loading: true
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
