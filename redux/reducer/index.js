import { combineReducers } from "redux";
import session from "./session";
import room from "./room";
import message from "./message";

export * from "./session";

export default combineReducers({
  session,
  room,
  message
});
