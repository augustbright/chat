import { NextPageContext } from "next";
import getConfig from "next/config";
import PropType from "prop-types";
import Router from 'next/router';

//Const
export const APPLICATION_API_PATH = "/api";

//Helpers
export const isServerContext = (context: NextPageContext): boolean =>
  !!context.req;

export const getPublicRuntimeConfig = (): Record<string, any> =>
  getConfig().publicRuntimeConfig;

export const getApplicationAddress = (): string =>
  getPublicRuntimeConfig().appAddress;

export const isomorphicURL = (path: string): string =>
  `${getApplicationAddress()}${path}`;

export const isomorphicEndpoint = (endpoint: string): string =>
  isomorphicURL(`${APPLICATION_API_PATH}${endpoint}`);

export const isomorphicCredintials = (
  context: NextPageContext,
  config: RequestInit = {}
): RequestInit => {
  const isServer = isServerContext(context);
  const includeHeaders = isServer ? (context.req.headers || {}) : {} as object;
  return {
    ...config,
    credentials: isServer ? "include" : "same-origin",
    headers: {
      ...includeHeaders
    }
  };
};

export const isomorphicRedirect = (context: NextPageContext, location: string): void => {
  const isServer = isServerContext(context);
  if (isServer) {
    context.res.writeHead(302, {
      Location: location
    }).end();
  } else {
    Router.push(location);
  }
};

//Prop types
export const CommonPropTypes = {
  SessionInfo: PropType.shape({
    nickname: PropType.string
  })
};
