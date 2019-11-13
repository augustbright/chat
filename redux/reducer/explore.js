import { createActions, handleActions } from "redux-actions";

const DEFAULT_STATE = {
  query: "",
  near: false,
  passwords: false,
  results: [],
  loading: false,
  error: null
};

export const {
  setExploreQuery,
  setExploreNear,
  setExplorePasswords,
  requestExploreResults,
  setExploreResults,
  failExploreResults
} = createActions({
  SET_EXPLORE_QUERY: query => ({ query }),
  SET_EXPLORE_NEAR: near => ({ near }),
  SET_EXPLORE_PASSWORDS: passwords => ({ passwords }),
  REQUEST_EXPLORE_RESULTS: () => ({}),
  SET_EXPLORE_RESULTS: results => ({ results }),
  FAIL_EXPLORE_RESULTS: error => ({ error })
});

export default handleActions({
    [setExploreQuery.toString()]: (state, {payload: {query}}) => ({
        ...state,
        query
    }),
    [setExploreNear.toString()]: (state, {payload: {near}}) => ({
        ...state,
        near
    }),
    [setExplorePasswords.toString()]: (state, {payload: {passwords}}) => ({
        ...state,
        passwords
    }),
    [requestExploreResults.toString()]: state => ({
        ...state,
        loading: true
    }),
    [setExploreResults.toString()]: (state, {payload: {results}}) => ({
        ...state,
        loading: false,
        error: null,
        results
    }),
    [failExploreResults.toString()]: (state, {payload: {error}}) => ({
        ...state,
        loading: false,
        error
    })
}, DEFAULT_STATE);
