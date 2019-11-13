import React from "react";
import { redirectUnauthenticated } from "../lib/isomorphic";
import Page from "../components/layout/Page";
import Double from "../components/layout/Double";
import RoomsList from "../components/RoomsList";
import ChatArea from "../components/chat/Area";
import { INextPageContextWithSaga } from "../redux/store";
import {
  initSessionInfo,
  initRooms,
  initMessages,
  initInfoOnMe
} from "../lib/store_initializers";

const Index = () => {
  return (
    <Page>
      <Double leftContent={<RoomsList />} rightContent={<ChatArea />} />
    </Page>
  );
};

Index.getInitialProps = async (context: INextPageContextWithSaga) => {
  await initSessionInfo(context);

  // If user is not logged in, refirect to "/welcome"
  if (redirectUnauthenticated(context, "/welcome")) {
    return {};
  }

  await Promise.all([initInfoOnMe(context), initRooms(context)]);
  const state = context.store.getState();

  //after setting active room, fetch messages for selected room
  await initMessages(context);

  return {};
};

export default Index;
