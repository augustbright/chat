import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware, { END } from "redux-saga";

import reducer from "./reducer";
import rootSaga from "./sagas";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export default (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware({});
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  store.runSaga = () => {
    //avoid running twice
    if (store.saga) return;
    store.saga = sagaMiddleware.run(rootSaga);
  };

  store.stopSaga = async () => {
      //avoid running twice
      if (!store.saga) return;
      store.dispatch(END);
      await store.saga.done;
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
