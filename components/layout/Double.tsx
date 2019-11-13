import React from "react";

export default ({ leftContent, rightContent }) => {
  return (
    <div className="row mt-3">
      <div className="col col-2">{leftContent}</div>
      <div className="col">{rightContent}</div>
    </div>
  );
};
