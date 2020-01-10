import { ObjectID } from "mongodb";
import { getDB, IMongoRecord } from "./database";

type MessageContent = string;

interface IMessageRecord extends IMongoRecord {
  authorId: ObjectID;
  roomId: ObjectID;
  content: MessageContent;
  datetime?: Date;
  service?: boolean;
}

export enum ServiceMessage {
    'JOINED'
};

export const getMessagesCollection = () => getDB().collection("messages");

export async function put(record: IMessageRecord): Promise<IMessageRecord> {
  record['datetime'] = record['datetime'] || new Date();
  const messages = getMessagesCollection();
  const insertResult = await messages.insertOne(record);
  return {
    _id: insertResult.insertedId,
    ...record
  };
}
