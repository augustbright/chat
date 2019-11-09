import { NextPageContext } from "next";
import { createStore, applyMiddleware, compose, Store, Dispatch } from "redux";
import createSagaMiddleware, { END, Task } from "redux-saga";

import reducer from "./reducer";
import rootSaga from "./sagas";

export interface IStoreWithSaga extends Store {
  sagaTask?: Task;
}

export interface INextPageContextWithSaga extends NextPageContext {
  isServer: boolean,
  store: IStoreWithSaga
}

const composeEnhancers =
  (typeof window !== "undefined" &&
    window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) ||
  compose;

export default (initialState): IStoreWithSaga => {
  const sagaMiddleware = createSagaMiddleware({});
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  ) as IStoreWithSaga;

  /**
   * next-redux-saga depends on `sagaTask` being attached to the store.
   * It is used to await the rootSaga task before sending results to the client.
   * However it should run only once - which must be regarded when using `next-redux-wrapper:^2.1.0`
   */
  if (!store.sagaTask) {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }  

  return store;
};
