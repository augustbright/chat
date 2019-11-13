import React from "react";
import { useSelector } from "react-redux";
import { selectMessageList } from "../../redux/selectors";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";

export default () => {
  const messageList = useSelector(selectMessageList);
  const messagesContent = messageList.length ? 
    messageList.map(message => (
      <MessageItem key={message._id} message={message} />
    ))
   : (<div className="d-flex justify-content-center pt-3 pb-3 text-secondary">Nobody has written anything here yet</div>);
  return (
    <>
      {messagesContent}
      <MessageInput />
    </>
  );
};
