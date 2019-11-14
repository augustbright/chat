import React from "react";
import RoomItem from "./RoomItem";
import { useSelector, useDispatch } from "react-redux";
import { selectMyRooms, selectActiveRoom } from "../redux/selectors";
import { setActiveRoom } from "../redux/reducer/room";

export default () => {
  const dispatch = useDispatch();
  const myRooms = useSelector(selectMyRooms);
  const activeRoom = useSelector(selectActiveRoom);
  
  return (
    <ul className="list-group list-group-flush">
      {myRooms.map(room => (
        <RoomItem
          key={room._id}
          room={room}
          active={room._id === activeRoom}
          onClick={e => dispatch(setActiveRoom(room._id))}
        />
      ))}
    </ul>
  );
};
