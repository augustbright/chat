import { NextPageContext } from "next";
import getConfig from "next/config";
import PropType from "prop-types";
import Router from 'next/router';

//Const
export const APPLICATION_API_PATH = "/api";

//Helpers
export const isServerContext = (context) =>
  !!context.req;

export const getPublicRuntimeConfig = () =>
  getConfig().publicRuntimeConfig;

export const getApplicationAddress = () =>
  getPublicRuntimeConfig().appAddress;

export const isomorphicURL = (path) =>
  `${getApplicationAddress()}${path}`;

export const isomorphicEndpoint = (endpoint) =>
  isomorphicURL(`${APPLICATION_API_PATH}${endpoint}`);

export const isomorphicCredintials = (
  context,
  config = {}
) => {
  const isServer = isServerContext(context);
  const includeHeaders = isServer ? (context.req.headers || {}) : {};
  return {
    ...config,
    credentials: isServer ? "include" : "same-origin",
    headers: {
      ...includeHeaders
    }
  };
};

export const isomorphicRedirect = (context, location) => {
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
  Children: PropType.oneOfType([
    PropType.node,
    PropType.arrayOf(PropType.node)
  ]),
  SessionInfo: PropType.shape({
    nickname: PropType.string
  })
};
