import React from "react";
import { redirectUnauthenticated } from "../lib/isomorphic";
import Page from "../components/layout/Page";
import Double from "../components/layout/Double";
import ChatArea from "../components/chat/Area";
import { INextPageContextWithSaga } from "../redux/store";
import {
  initSessionInfo,
  initInfoOnMe
} from "../lib/store_initializers";

const Index = () => {
  return (
    <Page>
      <Double leftContent={'My rooms'} rightContent={<ChatArea />} />
    </Page>
  );
};

Index.getInitialProps = async (context: INextPageContextWithSaga) => {
  await initSessionInfo(context);

  // If user is not logged in, refirect to "/welcome"
  if (redirectUnauthenticated(context, "/welcome")) {
    return {};
  }

  await initInfoOnMe(context);

  return {};
};

export default Index;
