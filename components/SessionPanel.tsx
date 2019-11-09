import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/selectors";
import LoggedInPanel from "./LoggedInPanel";

export default () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return <>{isLoggedIn ? <LoggedInPanel /> : ""}</>;
};
