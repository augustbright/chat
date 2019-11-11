import React, { useState, KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestSendMessage } from "../redux/reducer/message";
import { selectIsMessageSending, selectActiveRoom } from "../redux/selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const isMessageSending = useSelector(selectIsMessageSending);
  const roomId = useSelector(selectActiveRoom);
  const onAreaKeyPress = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'Enter') {
      sendMessage();
    }
  };
  const sendMessage = () => {
    dispatch(requestSendMessage({message, roomId}));
    setMessage("");
  }

  //When message is sending, show spinner inside button
  const buttonContent = (
    <>
      Send
      {isMessageSending ? (
        <div className="spinner-border spinner-border-sm ml-2" role="status" />
      ) : (
        <FontAwesomeIcon icon={faArrowRight} size="1x" className="ml-1" />
      )}
    </>
  );

  return (
    <div className="d-flex">
      <textarea
        className="form-control"
        rows={2}
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={onAreaKeyPress}
      />
      <div className="ml-3">
        <button className="btn btn-primary" onClick={() => sendMessage()}>
          {buttonContent}
        </button>
        <div className="text-secondary d-flex justify-content-center">ctrl+enter</div>
      </div>
    </div>
  );
};
