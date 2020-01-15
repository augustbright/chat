import { createActions, handleActions } from "redux-actions";

const DEFAULT_STATE = {
  messages: [],
  loading: false,
  messageSending: false,
  error: null,
  errorMessageSending: null
};

export const {
  requestFetchMessages,
  setMessages,
  failFetchMessages,
  requestSendMessage,
  successSendMessage,
  failSendMessage,
  handleNewMessage
} = createActions({
  REQUEST_FETCH_MESSAGES: () => ({}),
  SET_MESSAGES: messages => ({ messages }),
  FAIL_FETCH_MESSAGES: error => ({ error }),
  REQUEST_SEND_MESSAGE: ({ roomId, message }) => ({ roomId, message }),
  SUCCESS_SEND_MESSAGE: () => ({}),
  FAIL_SEND_MESSAGE: error => ({ error }),
  HANDLE_NEW_MESSAGE: (roomId) => ({roomId})
});

export default handleActions(
  {
    [requestFetchMessages.toString()]: state => ({
      ...state,
      loading: true
    }),
    [setMessages.toString()]: (state, { payload: { messages } }) => ({
      ...state,
      messages,
      loading: false,
      error: null
    }),
    [failFetchMessages.toString()]: (state, { payload: { error } }) => ({
      ...state,
      messages: [],
      loading: false,
      error
    }),
    [requestSendMessage.toString()]: state => ({
      ...state,
      messageSending: true
    }),
    [successSendMessage.toString()]: state => ({
      ...state,
      messageSending: false,
      errorMessageSending: null
    }),
    [failSendMessage.toString()]: (state, { payload: { error } }) => ({
      ...state,
      messageSending: false,
      errorMessageSending: error
    })
  },
  DEFAULT_STATE
);
