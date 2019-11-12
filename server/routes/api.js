import express from "express";
import room from "./room";
import message from "./message";
import session from "./session";
import me from "./me";
import {forAuthenticatedOnly} from '../lib/auth';
const api = express.Router();

api.use("/session", session);

api.use("/room", forAuthenticatedOnly, room);
api.use("/message", forAuthenticatedOnly, message);
api.use("/me", forAuthenticatedOnly, me);

export default api;
