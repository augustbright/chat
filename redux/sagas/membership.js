import { call, takeLatest, put } from "redux-saga/effects";
import { requestMyRooms, setMyRooms, failMyRooms } from "../reducer/membership";
import { requestEndpoint } from "./common";

export function* performRequestMyRooms() {
    try {
        const rooms = yield call(requestEndpoint, '/room/mine');
        yield put(setMyRooms(rooms));    
    } catch (error) {
        yield put(failMyRooms(error));
    }
}

export function* rootMembershipWatcher() {
  yield takeLatest(requestMyRooms, performRequestMyRooms);
}
