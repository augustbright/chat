import React from "react";
import { useSelector } from "react-redux";
import { selectSessionAuthenticated } from "../redux/selectors";
import LoggedInPanel from "./LoggedInPanel";

export default () => {
  const authenticated = useSelector(selectSessionAuthenticated);
  return <>{authenticated ? <LoggedInPanel /> : ""}</>;
};
