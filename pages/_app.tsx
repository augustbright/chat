import React from "react";
import App from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import createStore from "../redux/store";
import { handleNewMessage } from "../redux/reducer/message";
import { initSessionCookie } from "../lib/store_initializers";
import { parseQueryFromURL } from "../lib/isomorphic";
import {
  setExploreQuery,
  setExploreNear,
  setExplorePasswords
} from "../redux/reducer/explore";
import Router from "next/router";

const QUERY_DISPATCH_MAPPING = {
  q: setExploreQuery,
  n: setExploreNear,
  p: setExplorePasswords
};

function dispatchQueryParams({ query, store }) {
  Object.keys(QUERY_DISPATCH_MAPPING).forEach(queryKey => {
    if (queryKey in query) {
      store.dispatch(QUERY_DISPATCH_MAPPING[queryKey](query[queryKey]));
    }
  });
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    initSessionCookie(ctx);
    const pageProps = Component["getInitialProps"]
      ? await Component["getInitialProps"](ctx)
      : {};

    dispatchQueryParams(ctx);

    return { pageProps, query: ctx.query };
  }
  componentDidMount() {
    //@ts-ignore
    const { store } = this.props;
    if (process.browser) {
      Router.beforePopState(({ url }) => {
        const query = parseQueryFromURL(url);
        dispatchQueryParams({ store, query });
        return true;
      });

      // setup websocket listener
      const ws = new WebSocket("ws://localhost:8080");
      ws.onmessage = async event => {
        const data = await JSON.parse(event.data || "{}");
        if (data.event === 'message') {
          store.dispatch(handleNewMessage(data.payload.roomId));
        }
      };
    }
  }
  render() {
    //@ts-ignore
    const { Component, pageProps, store } = this.props;
    return (
      <Provider {...{ store }}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
