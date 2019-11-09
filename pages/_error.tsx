import React from "react";
import BasicPage from "../components/layout/BasicPage";

const Error = ({ statusCode }) => (
  <BasicPage>
    <div className="row justify-content-center">
      <div className="col col-auto">
        <h1 className="text-danger">{ statusCode }</h1>
      </div>
    </div>
  </BasicPage>
);

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
