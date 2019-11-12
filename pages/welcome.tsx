import React from "react";
import Page from "../components/layout/Page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlusG } from "@fortawesome/free-brands-svg-icons";
import Welcoming from "../components/welcome/Welcoming";
import { INextPageContextWithSaga } from "../redux/store";
import { initSessionInfo, initInfoOnMe } from "../lib/store_initializers";
import { redirectAuthenticated } from "../lib/isomorphic";

const Welcome = () => {
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
  if (redirectAuthenticated(context, "/")) {
    return {};
  }
  // await initInfoOnMe(context);
  return {};
};

export default Welcome;
