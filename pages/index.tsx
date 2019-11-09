import React from "react";
import { useSelector } from "react-redux";
import {
  CommonPropTypes,
  isomorphicRedirect
} from "../common";
import Page from "../components/layout/Page";
import { INextPageContextWithSaga } from "../redux/store";
import { selectNickname, selectIsLoggedIn } from "../redux/selectors";
import { initSessionInfo } from "../common/init_store";

const Index = () => {
  const nickname = useSelector(selectNickname);
  return (
    <Page>
      <h1>Hola, {nickname}!</h1>
    </Page>
  );
};

Index.propTypes = {
  sessionInfo: CommonPropTypes.SessionInfo
};

Index.getInitialProps = async (context: INextPageContextWithSaga) => {
  await initSessionInfo(context);

  // If user is not logged in, refirect to "/welcome"
  const state = context.store.getState();
  if (!selectIsLoggedIn(state)) {
    isomorphicRedirect(context, "/welcome");
  }

  return {};
};

export default Index;
