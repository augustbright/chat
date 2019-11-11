import {fork, take, call, put} from 'redux-saga/effects';
import {requestFetchRooms, setRooms, failFetchRooms} from '../reducer/room';
import {requestEndpoint} from './common';

export function *watchFetchRoomRequests() {
    while (true) {
        yield take(requestFetchRooms);
        try {
            const roomResponse = yield call(requestEndpoint, '/room', {
                'moethod': 'GET'
            });
            const rooms = yield roomResponse.json();
            yield put(setRooms(rooms));
    
        } catch (error) {
            yield put(failFetchRooms(error));
        }
    }
}

export function *watchRoomRequests() {
    yield fork(watchFetchRoomRequests);
}