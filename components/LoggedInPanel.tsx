import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNickname } from "../redux/selectors";
import { requestDropSession } from "../redux/reducer/session";

export default () => {
  const dispatch = useDispatch();
  const nickname = useSelector(selectNickname);
  return (
    <>
      <span className="mr-2">{nickname}</span>
      <button
        onClick={() => {
          dispatch(requestDropSession());
        }}
        className="btn btn-outline-danger my-2 my-sm-0"
      >
        Leave
      </button>
    </>
  );
};
