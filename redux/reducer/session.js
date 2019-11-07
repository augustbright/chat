import { createActions, handleActions } from "redux-actions";

const INITIAL_STATE = {
  info: null,
  loading: false,
  error: null
};

export const {
  requestSessionInfo,
  setSessionInfo,
  dropSession,
  errorSessionInfo
} = createActions({
  REQUEST_SESSION_INFO: () => ({}),
  SET_SESSION_INFO: info => ({ info }),
  DROP_SESSION: () => ({}),
  ERROR_SESSION_INFO: error => ({ error })
});

export default handleActions(
  {
    [requestSessionInfo.toString()]: state => ({ ...state, loading: true }),
    [setSessionInfo.toString()]: (state, { payload: { info } }) => ({
      info,
      loading: false,
      error: null
    }),
    [dropSession.toString()]: state => ({
      info: null,
      loading: false,
      error: false
    }),
    [errorSessionInfo.toString()]: (state, { payload: { error } }) => ({
      info: null,
      loading: false,
      error
    })
  },
  INITIAL_STATE
);
