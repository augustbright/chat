import { MongoClient, Db, ObjectID } from "mongodb";

export interface IMongoRecord {
  _id?: ObjectID
}

let client: MongoClient;
let db: Db;

export const setupMongoClient = async ({
  MONGO_URL,
  MONGO_DB
}): Promise<[MongoClient, Db]> => {
  client = new MongoClient(MONGO_URL, {
    useUnifiedTopology: true
  });
  await client.connect();
  console.log(`Connected to MongoDB`);
  db = client.db(MONGO_DB);
  return [client, db];
};

export const getDB = (): Db => db;
