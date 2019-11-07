import React from "react";
import fetch from "isomorphic-fetch";
import { NextPageContext } from "next";
import {
  CommonPropTypes,
  isomorphicEndpoint,
  isomorphicCredintials,
  isomorphicRedirect
} from "../common";

const Index = ({ sessionInfo }) => {
  return (
    <div>
      <h1>Hola, {sessionInfo.nickname}!</h1>
    </div>
  );
};

Index.propTypes = {
  sessionInfo: CommonPropTypes.SessionInfo
};

Index.getInitialProps = async (context: NextPageContext) => {
  console.log('isomorphic endpoint', isomorphicEndpoint("/session"));
  const sessionResponse = await fetch(
    isomorphicEndpoint("/session"),
    isomorphicCredintials(context, {
      method: "GET"
    })
  );
  const sessionInfo = await sessionResponse.json();
  if (!sessionInfo) {
    isomorphicRedirect(context, '/welcome');
    return {};
  }
  return { sessionInfo };
};

export default Index;
