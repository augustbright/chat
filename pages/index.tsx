import React from "react";
import { CommonPropTypes, isomorphicRedirect } from "../common";
import Page from "../components/layout/Page";
import RoomsList from "../components/RoomsList";
import MessageBox from "../components/MessageBox";
import { INextPageContextWithSaga } from "../redux/store";
import {
  selectIsLoggedIn,
  selectFirstRoom
} from "../redux/selectors";
import { setActiveRoom } from "../redux/reducer/room";
import { initSessionInfo, initRooms, initMessages } from "../common/init_store";

const Index = () => {
  return (
    <Page>
      <div className="row mt-3">
        <div className="col col-2">
          <RoomsList />
        </div>
        <div className="col">
          <MessageBox />
        </div>
      </div>
    </Page>
  );
};

Index.propTypes = {
  sessionInfo: CommonPropTypes.SessionInfo
};

Index.getInitialProps = async (context: INextPageContextWithSaga) => {
  await Promise.all([
    initSessionInfo(context),
    initRooms(context)
  ]);
  const state = context.store.getState();

  //set first room active by default
  const firstRoom = selectFirstRoom(state);
  const firstRoomId = (firstRoom || {})._id;
  context.store.dispatch(setActiveRoom(firstRoomId));

  //after setting active room, fetch messages for selected room
  await initMessages(context);

  // If user is not logged in, refirect to "/welcome"
  if (!selectIsLoggedIn(state)) {
    isomorphicRedirect(context, "/welcome");
  }

  return {};
};

export default Index;
