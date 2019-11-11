import express from "express";
import {randomBytes} from 'crypto';
const message = express.Router();

const MOCK_MESSAGES = {
  1: [
    {
      _id: 1,
      content: "Hola! This is mocked message",
      author: {
        nickname: "Steve"
      }
    },
    {
      _id: 2,
      content: "How do u do?",
      author: {
        nickname: "Jessica"
      }
    },
    {
      _id: 3,
      content: "loooooooooooooooool",
      author: {
        nickname: "XXX__BIGBOSSS777__XXX"
      }
    }
  ],
  2: [
    {
      _id: 4,
      content: "Wut",
      author: {
        nickname: "Michael"
      }
    },
    {
      _id: 5,
      content: "Лол кек чебурек",
      author: {
        nickname: "Типичный козерог"
      }
    }
  ]
};

message.get("/:roomId", (req, res) => {
  const { roomId } = req.params;
  res.json(MOCK_MESSAGES[roomId] || []);
});

message.put("/:roomId", (req, res) => {
  const { roomId } = req.params;
  const {content} = req.body;
  const mock = (MOCK_MESSAGES[roomId] = MOCK_MESSAGES[roomId] || []);
  mock.push({
      id: randomBytes(16).toString('hex'),
      content,
      author: {
        nickname: req.session.info.nickname
      }
  });
  res.status(200).end();
});

export default message;
