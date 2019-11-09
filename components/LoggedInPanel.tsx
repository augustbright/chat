import React from "react";
import { useDispatch } from "react-redux";
import { requestDropSession } from "../redux/reducer/session";

export default () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(requestDropSession());
      }}
      className="btn btn-outline-danger my-2 my-sm-0"
    >
      Leave
    </button>
  );
};
