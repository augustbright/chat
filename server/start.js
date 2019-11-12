import express from "express";
import BodyParser from "body-parser";
import FormData from "express-form-data";
import next from "next";
import session from "express-session";
import ConnectMongo from "connect-mongo";
import { setupMongoClient } from "./database";
import api from "./routes/api";
import auth from "./routes/auth";
import { setupPassport } from "./lib/auth";

export default module.exports = async ({
  NODE_ENV,
  PORT,
  MONGO_URL,
  MONGO_DB,
  COOKIE_NAME,
  COOKIE_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL
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
    name: COOKIE_NAME,
    secret: COOKIE_SECRET,
    rolling: true,
    resave: false,
    store: mongoStore
  });
  app.use(sessionMiddleware);

  //Setup passport
  setupPassport(app, {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL
  });

  //Setup express api routes
  app.use(BodyParser.json());
  app.use(
    FormData.parse({
      autoClean: true
    })
  );
  app.use(FormData.format());
  app.use("/auth", auth);
  app.use("/api", api);

  //Setup next.js
  const nextApp = next({ dev: NODE_ENV === "development" });
  const nextHandler = nextApp.getRequestHandler();
  await nextApp.prepare();
  app.get("*", (req, res) => {
    nextHandler(req, res);
  });

  return true;
};
