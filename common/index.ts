import { INextPageContextWithSaga } from "../redux/store";
import getConfig from "next/config";
import PropType from "prop-types";
import Router from "next/router";

//Const
export const APPLICATION_API_PATH = "/api";

//Helpers
export const isServerContext = (context: INextPageContextWithSaga): boolean =>
  !!context.req;

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
  if (context.isServer) {
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

//Prop types
export const CommonPropTypes = {
  Children: PropType.oneOfType([
    PropType.node,
    PropType.arrayOf(PropType.node)
  ]),
  SessionInfo: PropType.shape({
    nickname: PropType.string
  })
};
