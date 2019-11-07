import express from "express";
import BodyParser from 'body-parser';
import FormData from 'express-form-data';
import next from "next";
import session from "express-session";
import ConnectMongo from "connect-mongo";
import { setupMongoClient } from "./database";
import api from './routes/api';

export default module.exports = async ({
  NODE_ENV,
  PORT,
  MONGO_URL,
  MONGO_DB,
  COOKIE_SECRET
}) => {
  //Create Express app
  const app = express();
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
  });

  //Setup MongoDB client
  const [mongoClient, mongoDB] = await setupMongoClient({
    MONGO_URL,
    MONGO_DB
  });
  app.set("mongoDB", mongoDB);

  //Setup session
  const MongoStore = ConnectMongo(session);
  const mongoStore = new MongoStore({
    autoReconnect: true,
    client: mongoClient
  });
  const sessionMiddleware = session({
    secret: COOKIE_SECRET,
    rolling: true,
    store: mongoStore
  });
  app.use(sessionMiddleware);

  //Setup express api routes
  app.use(BodyParser.json());
  app.use(FormData.parse({
    autoClean: true
  }));
  app.use(FormData.format());
  app.use('/api', api);

  //Setup next.js
  const nextApp = next({ dev: NODE_ENV === "development" });
  const nextHandler = nextApp.getRequestHandler();
  await nextApp.prepare();
  app.get("*", (req, res) => {
    nextHandler(req, res);
  });

  return true;
};
