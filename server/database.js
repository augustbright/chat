import { MongoClient, Db } from "mongodb";

export const setupMongoClient = async ({ MONGO_URL, MONGO_DB }) => {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log(`Connected to MongoDB`);
  return [client, client.db(MONGO_DB)];
};
