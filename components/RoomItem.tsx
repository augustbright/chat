import React from "react";

export default ({ room, active, onClick }) => {
  const classNames = ["list-group-item", "list-group-item-action"];
  if (active) {
    classNames.push("active");
  }

  return (
    <li {...{ onClick }} className={classNames.join(" ")}>
      {room.name}
    </li>
  );
};
