import express from "express";
import { getDB } from "../database";
import { ObjectID } from "mongodb";
const room = express.Router();

const MOCK_ROOMS = [
  {_id: 1, name: 'General'},
  {_id: 2, name: 'animals'},
  {_id: 3, name: 'art'},
  {_id: 4, name: 'sports'},
  {_id: 5, name: 'funny stuff'}
];

room.get("/", async (req, res) => {
  return res.json(MOCK_ROOMS);
  const db = getDB();
  const room = db.collection("room");
  const rooms = await room.find({});
  res.json(await rooms.toArray());
});

room.put("/", async (req, res) => {
  const db = getDB();
  const room = db.collection("room");
  const { name } = req.body;
  await room.insertOne({ name });
  res.status(200).end();
});

room.post("/:id", async (req, res) => {
  const db = getDB();
  const room = db.collection();
  const { name } = req.body;
  const { id } = req.params;
  await room.findOneAndUpdate(
    { _id: ObjectID(id) },
    {
      $set: {
        name
      }
    }
  );

  res.status(200).end();
});

export default room;
