import React from "react";
import App from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import createStore from "../redux/store";
import { setCookie } from "../redux/reducer";
import { getSessionCookie } from "../common";


class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const sessionCookie = getSessionCookie(ctx);
    ctx.store.dispatch(setCookie(sessionCookie));
    const pageProps = Component["getInitialProps"]
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

export default withRedux(createStore)(MyApp);
