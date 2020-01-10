import express from "express";
import { getDB } from "../lib/database";
import {ObjectID} from 'mongodb';
const me = express.Router();

const USER_PUBLIC_PROJECTION = { nickname: 1 };

me.get("/", async (req, res) => {
  //get information on current user
  const userId = req.user;
  const users = getDB().collection("users");
  const user = await users.findOne({ _id: new ObjectID(userId) }, USER_PUBLIC_PROJECTION);
  res.json(user);
});

me.post("/", async (req, res) => {
  //update information on current user
  const userId = req.user;
  const users = getDB().collection("users");
  const { nickname } = req.body;
  await users.updateOne({ _id: new ObjectID(userId) }, { $set: { nickname } });
  res.status(200).end();
});

export default me;
