import express from "express";
import { getDB } from "../database";
import { ObjectID } from "mongodb";
const room = express.Router();

room.get("/", async (req, res) => {
  const {q: query=''} = req.query;
  const filterQuery = {};
  const queryOptions = {};
  if (query) {
    filterQuery['$text'] = {$search: query};
    queryOptions.projection = {
      score: {$meta: 'textScore'}
    };
    queryOptions.sort = {
      score: {$meta: 'textScore'}
    };
  }

  const db = getDB();
  const rooms = await db.collection("rooms").find(filterQuery, queryOptions);
  res.json(await rooms.toArray());
});

room.put("/", async (req, res) => {
  const db = getDB();
  const room = db.collection("rooms");
  const { name, password } = req.body;
  const authorId = new ObjectID(req.user);
  await room.insertOne({ name, password, authorId });
  res.status(200).end();
});

room.post("/:id", async (req, res) => {
  const db = getDB();
  const room = db.collection("rooms");
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
