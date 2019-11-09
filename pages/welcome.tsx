import React, { useState } from "react";
import Page from "../components/layout/Page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import Welcoming from "../components/welcome/Welcoming";
import { useSelector, useDispatch } from "react-redux";
import { selectIsSessionLoading, selectNickname } from "../redux/selectors";
import { postSessionInfo } from "../redux/reducer/session";
import { INextPageContextWithSaga } from "../redux/store";
import { initSessionInfo } from '../common/init_store';

const Welcome = () => {
  const currentNickname = useSelector(selectNickname);  
  const isSessionLoading = useSelector(selectIsSessionLoading);
  const [nickname, setNickname] = useState(currentNickname);
  const dispatch = useDispatch();

  //When session is loading, show spinner inside button
  const buttonContent = (
    <>
      Welcome
      {isSessionLoading ? (
        <div className="spinner-border spinner-border-sm ml-2" role="status" />
      ) : (
        <FontAwesomeIcon icon={faAngleDoubleRight} size="1x" className="ml-1" />
      )}
    </>
  );

  return (
    <Page>
      <div className="row justify-content-center mt-5">
        <div className="col col-sm-12 col-md-6">
          <Welcoming />
        </div>
        <div className="col">
          <p>
            Please, tell us your
            <span className="text-success">&nbsp;nickname&nbsp;</span>- It's
            what other people what see
          </p>
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Your nickname"
            value={nickname}
            onChange={e => {setNickname(e.target.value)}}
          />
          <div className="d-flex justify-content-end mt-3">
            <button
              type="button"
              className="btn btn-success btn-lg"
              onClick={() => {
                dispatch(postSessionInfo({ nickname }));
              }}
            >
              {buttonContent}
            </button>
          </div>
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
