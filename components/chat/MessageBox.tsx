import React from "react";
import { useSelector } from "react-redux";
import { selectMessageList, selectActiveRoom } from "../../redux/selectors";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";

export default () => {
  const messageList = useSelector(selectMessageList);
  const activeRoom = useSelector(selectActiveRoom);
  return (
    <>
      {messageList.map(message => (
        <MessageItem key={message._id} message={message} />
      ))}
      <MessageInput />
    </>
  );
};
