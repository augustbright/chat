import { INextPageContextWithSaga } from "../redux/store";
import getConfig from "next/config";
import Router from "next/router";
import { AnyAction, ActionCreator } from "redux";
import {
  selectSessionAuthenticated,
  selectSessionUnauthenticated
} from "../redux/selectors";

interface IIsomorphicActionCreator extends ActionCreator<AnyAction> {
  (arg: any): AnyAction;
}

//Const
export const APPLICATION_API_PATH = "/api";

//Helpers
export const isServerContext = (context: INextPageContextWithSaga): boolean =>
  context.isServer;

export const getPublicRuntimeConfig = (): Record<string, any> =>
  getConfig().publicRuntimeConfig;

export const getApplicationAddress = (): string =>
  getPublicRuntimeConfig().appAddress;

export const isomorphicURL = (path: string): string =>
  `${getApplicationAddress()}${path}`;

export const isomorphicEndpoint = (endpoint: string): string =>
  isomorphicURL(`${APPLICATION_API_PATH}${endpoint}`);

export const getSessionCookie = (
  context: INextPageContextWithSaga
): string | void => {
  if (isServerContext(context)) {
    return context.req.headers.cookie;
  } else {
    return document.cookie;
  }
};

export const isomorphicRedirect = (
  context: INextPageContextWithSaga,
  location: string
): void => {
  const isServer = isServerContext(context);
  if (isServer) {
    context.res
      .writeHead(302, {
        Location: location
      })
      .end();
  } else {
    Router.push(location);
  }
};

//requests
export function request(
  context: INextPageContextWithSaga,
  url: string,
  requestInit: RequestInit = {}
) {
  const cookie = String(getSessionCookie(context));
  const requestInitFinal: RequestInit = {
    method: "GET",
    ...requestInit,
    credentials: "include",
    headers: {
      ...(requestInit.headers || {}),
      cookie
    }
  };
  return fetch(url, requestInitFinal);
}

export function requestEndpoint(
  context: INextPageContextWithSaga,
  endpoint: string,
  requestInit: RequestInit = {}
) {
  return request(context, isomorphicEndpoint(endpoint), requestInit);
}

export async function requestForStore(
  context: INextPageContextWithSaga,
  endpoint: string,
  actionCreator: IIsomorphicActionCreator
) {
  const response = await requestEndpoint(context, endpoint);
  const result = await response.json();
  context.store.dispatch(actionCreator(result));
}

export function redirectBySelector(
  context: INextPageContextWithSaga,
  location: string,
  selector: Function
): boolean {
  const state = context.store.getState();
  const condition = selector(state);
  if (condition) {
    isomorphicRedirect(context, location);
    return true;
  }
  return false;
}

export function redirectUnauthenticated(
  context: INextPageContextWithSaga,
  location: string
): boolean {
  return redirectBySelector(context, location, selectSessionUnauthenticated);
}

export function redirectAuthenticated(
  context: INextPageContextWithSaga,
  location: string
): boolean {
  return redirectBySelector(context, location, selectSessionAuthenticated);
}
