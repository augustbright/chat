import express from "express";
const session = express.Router();

session.get("/", (req, res) => {
  res.json({
    authenticated: !!req.user
  });
});

export default session;
