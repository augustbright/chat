import React from "react";
import App from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import createStore from "../redux/store";
import {initSessionCookie} from '../lib/store_initializers';


class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    initSessionCookie(ctx);    const pageProps = Component["getInitialProps"]
      ? await Component["getInitialProps"](ctx)
      : {};
    return { pageProps };
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
