import { Server } from 'ws';
import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import {  IClientArray, ISessionArray } from './models';
import { handleClose, handleMessage } from './handlers';

// Store connected clients and active sessions
export const connectedClients: IClientArray = {};
export const sessions: ISessionArray = {};

const setupWebSocket = (server: any) => {
  const wss = new Server({ server });

  wss.on('connection', (ws: WebSocket) => {
    const clientId = uuidv4();
    connectedClients[clientId] = { clientId, ws };

    // Listen for messages from this client
    ws.on('message', (message) => handleMessage(message, clientId, ws));

    // Clean up when a client disconnects
    ws.on('close', () => handleClose(clientId));
  });
};

export default setupWebSocket;