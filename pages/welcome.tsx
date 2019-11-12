import React, { useState } from "react";
import Page from "../components/layout/Page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { faGooglePlusG } from "@fortawesome/free-brands-svg-icons";
import Welcoming from "../components/welcome/Welcoming";
import { useSelector, useDispatch } from "react-redux";
import { selectIsSessionLoading, selectNickname } from "../redux/selectors";
import { postSessionInfo } from "../redux/reducer/session";
import { INextPageContextWithSaga } from "../redux/store";
import { initSessionInfo } from "../common/init_store";

const Welcome = () => {
  const currentNickname = useSelector(selectNickname);
  const isSessionLoading = useSelector(selectIsSessionLoading);
  const [nickname, setNickname] = useState(currentNickname);
  const dispatch = useDispatch();

  return (
    <Page>
      <div className="row justify-content-center mt-5">
        <div className="col col-sm-12 col-md-6">
          <Welcoming />
        </div>
        <div className="col">
          <a className="btn btn-primary" href="/auth/google">
            <FontAwesomeIcon icon={faGooglePlusG} size="1x" />
          </a>
        </div>
      </div>
    </Page>
  );
};

Welcome.getInitialProps = async (context: INextPageContextWithSaga) => {
  await initSessionInfo(context);
  return {};
};

export default Welcome;
