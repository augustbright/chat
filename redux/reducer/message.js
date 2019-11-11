import {createActions, handleActions} from 'redux-actions';

const DEFAULT_STATE = {
    messages: [],
    loading: false,
    error: null
};

export const {requestFetchMessages, setMessages, failFetchMessages} = createActions({
    REQUEST_FETCH_MESSAGES: roomId => ({roomId}),
    SET_MESSAGES: messages => ({messages}),
    FAIL_FETCH_MESSAGES: error => ({error})
});

export default handleActions({
    [requestFetchMessages.toString()]: (state) => ({
        ...state,
        loading: true
    }),
    [setMessages.toString()]: (state, {payload: {messages}}) => ({
        ...state,
        messages,
        loading: false,
        error: null
    }),
    [failFetchMessages.toString()]: (state, {payload: {error}}) => ({
        ...state,
        messages: [],
        loading: false,
        error
    })
}, DEFAULT_STATE);