import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  debounce
} from "redux-saga/effects";
import {
  setExploreQuery,
  setExploreNear,
  setExplorePasswords,
  requestExploreResults,
  setExploreResults,
  failExploreResults
} from "../reducer/explore";
import { requestEndpoint } from "./common";
import { selectExploreQueryString } from "../selectors";

const QUERY_DEBOUNCE = 500;

export function* dispatchRequestExplore() {
  yield put(requestExploreResults());
}

export function* performRequestExplore() {
  const queryString = yield select(selectExploreQueryString);
  try {
    const exploreResults = yield call(requestEndpoint, `/room?${queryString}`);
    yield put(setExploreResults(exploreResults));
  } catch (error) {
    yield put(failExploreResults(error));
  }
}

export function* rootExploreWatcher() {
  // on each change of filter dispatch `requestExploreResults`
  yield debounce(QUERY_DEBOUNCE, setExploreQuery, dispatchRequestExplore);
  yield takeEvery(setExplorePasswords, dispatchRequestExplore);
  yield takeEvery(setExploreNear, dispatchRequestExplore);

  yield takeLatest(requestExploreResults, performRequestExplore);
}
