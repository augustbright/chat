import React from "react";

export default ({ room, active, onClick }) => {
  const classNames = ["list-group-item", "list-group-item-action"];
  if (active) {
    classNames.push("active");
  }

  return (
    <li {...{ onClick }} className={classNames.join(" ")}>
      <div className="d-flex flex-column">
        <div className="d-flex">
          <div className="flex-grow-1">{room.name}</div>
          <div className="font-weight-bold text-danger">{room.unreadCount}</div>
        </div>
        <div className="text-secondary text-truncate">
          {room.lastMessage && room.lastMessage.content}
        </div>
      </div>
    </li>
  );
};
