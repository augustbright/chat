import React from "react";
import { useSelector } from "react-redux";
import { selectMyNickname } from "../redux/selectors";

export default () => {
  const nickname = useSelector(selectMyNickname);
  return (
    <>
      <span className="mr-2">{nickname}</span>
      <a
        href="/auth/logout"
        className="btn btn-outline-danger my-2 my-sm-0"
      >
        Leave
      </a>
    </>
  );
};
