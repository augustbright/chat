import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestJoinRoom } from "../../redux/reducer/room";
import { selectIsJoining } from "../../redux/selectors";

export default () => {
  const dispatch = useDispatch();
  const isJoining = useSelector(selectIsJoining);

  //When joining is in process, show indicator inside of the button
  const buttonContent = (
    <>
      {isJoining ? (
        <div className="spinner-border spinner-border-sm ml-2" role="status" />
      ) : (
        "Join"
      )}
    </>
  );

  return (
    <div className="d-flex justify-content-center pb-3">
      <button
        onClick={() => {
          dispatch(requestJoinRoom());
        }}
        className="btn btn-primary"
      >
        {buttonContent}
      </button>
    </div>
  );
};
