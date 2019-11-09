import React from "react";
import BasicPage from "../components/layout/BasicPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import Welcoming from '../components/welcome/Welcoming';

const Welcome = () => {
  return (
    <BasicPage>
      <div className="row justify-content-center mt-5">
        <div className="col col-sm-12 col-md-6">
            <Welcoming/>
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
          />
          <div className="d-flex justify-content-end mt-3">
            <button type="button" className="btn btn-success btn-lg">
              Welcome
              <FontAwesomeIcon
                icon={faAngleDoubleRight}
                size="1x"
                className="ml-1"
              />
            </button>
          </div>
        </div>
      </div>
    </BasicPage>
  );
};

export default Welcome;
