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
  "JOINED"
}

export const getMessagesCollection = () => getDB().collection("messages");

export async function put(record: IMessageRecord): Promise<IMessageRecord> {
  record["datetime"] = record["datetime"] || new Date();
  const messages = getMessagesCollection();
  const insertResult = await messages.insertOne(record);

  return {
    _id: insertResult.insertedId,
    ...record
  };
}

export async function setLastRead(messageId: ObjectID, userId: ObjectID) {
  const users = getDB().collection("users");
  const messages = getDB().collection("messaages");
  const message = await messages.findOne({ _id: messageId });
  const messageRoom = message.roomId;

  users.updateOne(
    { _id: userId },
    {
      [`lastRead.${messageRoom}`]: messageId
    }
  );
}

export async function getLastRead(userId: ObjectID) {
  const users = getDB().collection("users");
  const user = await users.findOne({ _id: userId });
  return user.lastMessages || {};
}

export async function getLastMessage(roomId: ObjectID) {
  const messages = getDB().collection("messages");

  const lastMessageAggregation = await messages
    .aggregate([{ $match: { roomId } }, { $sort: { datetime: -1 } }])
    .limit(1);
  const lastMessageArray = await lastMessageAggregation.toArray();

  return lastMessageArray[0];
}

export async function getUnreadCountForRoom(
  roomId: ObjectID,
  userId: ObjectID
) {
  const lastRead = await getLastRead(userId);
  const lastReadForRoom = lastRead[String(roomId)] || null;
  const messages = getDB().collection("messages");

  const pipeline = [];
  pipeline.push({ $match: { roomId } })

  if (lastReadForRoom) {
    const lastReadMessage = await messages.findOne({
      _id: new ObjectID(lastReadForRoom)
    });

    pipeline.push({ $match: { datetime: { $gt: lastReadMessage.datetime } } });
  }

  pipeline.push({ $count: "unread" });

  const cursor = await messages.aggregate(pipeline);
  const result = await cursor.next();

  return result["unread"];
}

export async function getAllUnreadData(userId: ObjectID) {
  const users = getDB().collection("users");
  const user = await users.findOne({ _id: userId });
  const userRooms = user.memberOfRooms;
  const result = {};

  const promises = userRooms.map(async roomId => {
    const unreadCount = await getUnreadCountForRoom(new ObjectID(roomId), userId);
    const lastMessage = await getLastMessage(new ObjectID(roomId));
    await Promise.all([unreadCount, lastMessage]);

    result[roomId] = {
      unreadCount: await unreadCount,
      lastMessage: await lastMessage
    };
  });

  await Promise.all(promises);

  return result;
}
