import { Server as WSServer } from "ws";
import * as WebSocket from "ws";
import { Application } from "express";
import { Server } from "http";

export type EventType = string;
export type EventPayload = any;
export interface BroadcastMessage {
    (event: string, payload: any): void
};

export const BROADCAST_FUNCTION_KEY = 'broadcastMessage';

export const notifyClients = (
  app: Application,
  event: EventType,
  payload: EventPayload
): void => {
  const notify = app.get(BROADCAST_FUNCTION_KEY);
  if (!notify) {
    throw new Error("Socket notification is not set up");
  }

  notify(event, payload);
};

export const setupSocketing = (server: Server): BroadcastMessage => {
  const clients: Set<WebSocket> = new Set();

  const onClientConnected = (client: WebSocket) => {
    clients.add(client);

    client.on("ping", () => {
      client.send("pong");
    });

    client.on("close", () => {
      clients.delete(client);
    });
  };

  const wsServer = new WSServer({ server });
  wsServer.on('connection', onClientConnected);

  console.log("Socketing has been established");

  return (event: string, payload: any) => {
    clients.forEach(client => {
      client.send(
        JSON.stringify({
          event,
          payload
        })
      );
    });
  };
};
