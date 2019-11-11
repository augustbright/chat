import React from "react";
import { selectRoomsList, selectActiveRoom } from "../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import RoomItem from "./RoomItem";
import { setActiveRoom } from "../redux/reducer/room";

export default () => {
  const dispatch = useDispatch();
  const roomsList = useSelector(selectRoomsList);
  const activeRoom = useSelector(selectActiveRoom);
  return (
    <ul className="list-group">
      {roomsList.map(room => (
        <RoomItem
          key={room._id}
          room={room}
          active={room._id === activeRoom}
          onClick={() => dispatch(setActiveRoom(room._id))}
        />
      ))}
    </ul>
  );
};
