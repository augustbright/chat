import {createActions, handleActions} from 'redux-actions';

const DEFAULT_STATE = {
    info: null,
    loading: false,
    error: null
}

export const {requestInfoOnMe, requestSetInfoOnMe, setInfoOnMe, failInfoOnMe} = createActions({
    REQUEST_INFO_ON_ME: () => ({}),
    REQUEST_SET_INFO_ON_ME: info => ({info}),
    SET_INFO_ON_ME: info => ({info}),
    FAIL_INFO_ON_ME: error => ({error})
});

export default handleActions({
    [requestInfoOnMe.toString()]: state => ({
        ...state,
        loading: true
    }),
    [requestSetInfoOnMe]: state => ({
        ...state
    }),
    [setInfoOnMe.toString()]: (state, {payload: {info}}) => ({
        ...state,
        loading: false,
        error: null,
        info
    }),
    [failInfoOnMe.toString()]: (state, {payload: {error}}) => ({
        ...state,
        loading: false,
        error
    })
}, DEFAULT_STATE);