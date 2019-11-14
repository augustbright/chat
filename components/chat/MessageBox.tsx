import React from "react";
import { useSelector } from "react-redux";
import { selectMessageList, selectIsMember } from "../../redux/selectors";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import JoinInput from "./JoinInput";

export default () => {
  const messageList = useSelector(selectMessageList);
  const isMember = useSelector(selectIsMember);

  const messagesContent = messageList.length ? (
    messageList.map(message => (
      <MessageItem key={message._id} message={message} />
    ))
  ) : (
    <div className="d-flex justify-content-center pt-3 pb-3 text-secondary">
      Nobody has written anything here yet
    </div>
  );

  const inputContent = isMember ? <MessageInput /> : <JoinInput />;

  return (
    <>
      <div className="message-content">
        {messagesContent}
      </div>
      {inputContent}
    </>
  );
};
