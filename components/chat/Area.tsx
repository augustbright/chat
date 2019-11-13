import React from "react";
import { useSelector } from "react-redux";
import { selectActiveRoom } from "../../redux/selectors";
import MessageBox from './MessageBox';
import Placeholder from './Placeholder';

export default () => {
  const activeRoom = useSelector(selectActiveRoom);
  return (
    <>
      {activeRoom ? <MessageBox/> : <Placeholder/>}
    </>
  );
};
