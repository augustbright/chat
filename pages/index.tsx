import React from "react";
import {
  CommonPropTypes,
  isomorphicRedirect
} from "../common";
import Page from "../components/layout/Page";
import RoomsList from '../components/RoomsList';
import { INextPageContextWithSaga } from "../redux/store";
import { selectIsLoggedIn } from "../redux/selectors";
import { initSessionInfo, initRooms } from "../common/init_store";

const Index = () => {
  return (
    <Page>
      <div className="row">
        <div className="col col-2 mt-3">
          <RoomsList/>
        </div>
        <div className="col">
          content
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

  // If user is not logged in, refirect to "/welcome"
  const state = context.store.getState();
  if (!selectIsLoggedIn(state)) {
    isomorphicRedirect(context, "/welcome");
  }

  return {};
};

export default Index;
