import express from "express";
import { ObjectID } from "mongodb";
import { put as putMessage, getMessagesCollection } from "../lib/message";
import { notifyClients } from "../lib/websocket";

const message = express.Router();

message.get("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  const messages = getMessagesCollection();
  const messagesCursor = await messages.aggregate([
    {
      $match: {
        roomId: new ObjectID(roomId)
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "authorId",
        foreignField: "_id",
        as: "authorsLookup"
      }
    },
    { $addFields: { author: { $arrayElemAt: ["$authorsLookup", 0] } } },
    {
      $sort: {
        datetime: 1
      }
    },
    {
      $project: {
        authorsLookup: 0
      }
    }
  ]);

  res.json(await messagesCursor.toArray());
});

message.put("/:roomId", async (req, res) => {
  const record = {
    authorId: new ObjectID(req.user),
    roomId: new ObjectID(req.params.roomId),
    content: req.body.content,
    datetime: new Date()
  };
  res.json(await putMessage(record));

  // Notify clients about new message
  setImmediate(() => {
    notifyClients(req.app, 'message', {
      roomId: req.params.roomId
    });
  });
});

export default message;
