import React from "react";
import { useSelector } from "react-redux";
import { CommonPropTypes } from "../common";
import BasicPage from "../components/layout/BasicPage";
import { INextPageContextWithSaga } from "../redux/store";
import { requestSessionInfo } from "../redux/reducer";
import { selectNickname } from "../redux/selectors";

const Index = () => {
  const nickname = useSelector(selectNickname);
  return (
    <BasicPage>
      <h1>Hola, {nickname}!</h1>
    </BasicPage>
  );
};

Index.propTypes = {
  sessionInfo: CommonPropTypes.SessionInfo
};

Index.getInitialProps = async (context: INextPageContextWithSaga) => {
  // Wait until we get session info
  await context.store.execSagaTasks(context.isServer, dispatch => {
    dispatch(requestSessionInfo());
  });

  //DELETE BELOW

  // const sessionResponse = await fetch(
  //   isomorphicEndpoint("/session"),
  //   isomorphicCredintials(context, {
  //     method: "GET"
  //   })
  // );
  // const sessionInfo = await sessionResponse.json();
  // if (!sessionInfo) {
  //   isomorphicRedirect(context, "/welcome");
  //   return {};
  // }
  return { sessionInfo: { nickname: "Hola Mocked" } };
};

export default Index;
