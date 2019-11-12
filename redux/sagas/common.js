import {select, call} from 'redux-saga/effects';
import {isomorphicEndpoint, isomorphicURL} from '../../lib/isomorphic';
import fetch from 'isomorphic-fetch';
import {selectSessionCookie} from '../selectors';

export function* requestURL(url, requestInit={}) {
    const cookie = yield select(selectSessionCookie);
    return yield call(fetch, url, {
        ...requestInit, 
        headers: {
            ...requestInit.headers || {},
            cookie
        }
    });
}

export function* requestPath(path, requestInit={}) {
    return yield call(requestURL, isomorphicURL(url), requestInit);
}

export function* requestEndpoint(endpoint, requestInit={}) {
    return yield call(requestURL, isomorphicEndpoint(endpoint), requestInit);
}