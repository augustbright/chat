import express from "express";
const session = express.Router();

session.get("/", (req, res) => {
  res.json(req.session.info || null);
});

session.post("/", async (req, res) => {
  const { nickname } = req.body || {};
  const info = (req.session.info = req.session.info || {});
  Object.assign(info, { nickname });

  res.status(200).end();
});

session.delete("/", (req, res) => {
    req.session.destroy();
    res.status(200).end();
});

export default session;
