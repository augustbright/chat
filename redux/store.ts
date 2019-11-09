import { NextPageContext } from "next";
import { createStore, applyMiddleware, compose, Store, Dispatch } from "redux";
import createSagaMiddleware, { END, Task } from "redux-saga";

import reducer from "./reducer";
import rootSaga from "./sagas";

export interface IStoreWithSaga extends Store {
  saga?: Task;
  runSaga: () => void;
  stopSaga: () => Promise<void>;
  execSagaTasks: (
    isServer: boolean,
    tasks: (dispatch: Dispatch) => void
  ) => Promise<void>;
}

export interface INextPageContextWithSaga extends NextPageContext {
  isServer: boolean,
  store: IStoreWithSaga
}

const composeEnhancers =
  (typeof window !== "undefined" &&
    window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) ||
  compose;

export default (initialState, options): IStoreWithSaga => {
  const sagaMiddleware = createSagaMiddleware({});
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  ) as IStoreWithSaga;

  store.runSaga = () => {
    //avoid running twice
    if (store.saga) return;
    store.saga = sagaMiddleware.run(rootSaga);
  };

  store.stopSaga = async () => {
    //avoid running twice
    if (!store.saga) return;
    store.dispatch(END);
    await store.saga.toPromise();
    store.saga = null;
  };

  store.execSagaTasks = async (isServer, tasks) => {
    store.runSaga();
    tasks(store.dispatch);
    await store.stopSaga();

    //re-run on client side
    if (!isServer) {
      store.runSaga();
    }
  };

  store.runSaga();

  return store;
};
