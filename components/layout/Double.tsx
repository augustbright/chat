import React from "react";

export default ({ leftContent, rightContent }) => {
  return (
    <div className="row pt-3 h-100">
      <div className="col col-2">{leftContent}</div>
      <div className="col d-flex flex-column mh-100">{rightContent}</div>
    </div>
  );
};
