import React from "react";
import { redirectUnauthenticated } from "../../lib/isomorphic";
import {
  initSessionInfo,
  initInfoOnMe,
  initMessages
} from "../../lib/store_initializers";
import { INextPageContextWithSaga } from "../../redux/store";
import { setActiveRoom } from "../../redux/reducer/room";
import Page from "../../components/layout/Page";
import MessageBox from "../../components/chat/MessageBox";

const Room = () => {
  return (
    <Page>
      <div className="row justify-content-center pt-3">
        <div className="col-12 col-md-6">
          <MessageBox />
        </div>
      </div>
    </Page>
  );
};

Room.getInitialProps = async (context: INextPageContextWithSaga) => {
  await initSessionInfo(context);
  await initInfoOnMe(context);
  if (redirectUnauthenticated(context, "/welcome")) {
    return {};
  }

  context.store.dispatch(setActiveRoom(context.query.id));
  await initMessages(context);

  return {};
};

export default Room;
