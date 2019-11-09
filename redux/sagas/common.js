import {select, call} from 'redux-saga/effects';
import {isomorphicEndpoint} from '../../common';
import fetch from 'isomorphic-fetch';
import {selectSessionCookie} from '../selectors';

export function* requestEndpoint(endpoint, requestInit={}) {
    const cookie = yield select(selectSessionCookie);
    return yield call(fetch, isomorphicEndpoint(endpoint), {
        ...requestInit, 
        headers: {
            ...requestInit.headers || {},
            cookie
        }
    });
}