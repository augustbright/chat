import React from "react";
import fetch from "isomorphic-fetch";
import {
  CommonPropTypes,
  isomorphicEndpoint,
  isomorphicCredintials,
  isomorphicRedirect
} from "../common";
import BasicPage from "../components/layout/BasicPage";

const Index = ({ sessionInfo }) => {
  return (
    <BasicPage>
      <h1>Hola, {sessionInfo.nickname}!</h1>
    </BasicPage>
  );
};

Index.propTypes = {
  sessionInfo: CommonPropTypes.SessionInfo
};

Index.getInitialProps = async ({context}) => {
  console.log("isomorphic endpoint", isomorphicEndpoint("/session"));
  const sessionResponse = await fetch(
    isomorphicEndpoint("/session"),
    isomorphicCredintials(context, {
      method: "GET"
    })
  );
  const sessionInfo = await sessionResponse.json();
  if (!sessionInfo) {
    isomorphicRedirect(context, "/welcome");
    return {};
  }
  return { sessionInfo };
};

export default Index;
