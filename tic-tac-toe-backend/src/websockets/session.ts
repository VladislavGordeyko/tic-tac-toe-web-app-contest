import { IGamePayload, IPlayer, ISession, ITelegramData, WSMessageType } from './models';
import bot from '../telegramBot';
import { v4 as uuidv4 } from 'uuid';
import { getUserPhotoLink } from '../telegramBot/apiCommands';
import { getInitialGameStatus, sendToAllClientsInSession } from './utils';
import { connectedClients, sessions } from './ws';
import { WebSocket } from 'ws';
import { sendSessionError } from './error';

// Create a user object from provided Telegram data and fetch their avatar
const createUserWithAvatar = async (data: ITelegramData, clientId: string) => {
  const avatar = await getUserPhotoLink(bot, data.user?.id);
  return {
    clientId,
    userName: data.user?.username || data.user?.first_name || 'anonymous',
    tgId: data.user?.id,
    avatar
  };
};

// Handle the creation of a new game session
export const createSession = async (data: any, clientId: string, ws: WebSocket) => {
  const sessionId = uuidv4();
  const user = await createUserWithAvatar(data.telegramData, clientId);
  const player: IPlayer = { ...user, score: 0, isCurrentMove: true };

  // Create a new session with the initiating player
  const newSession: ISession = {
    id: sessionId,
    spectators: [],
    players: [player],
    gameStatus: getInitialGameStatus(player),
  };

  sessions[sessionId] = newSession; // Store the session

  const payload: IGamePayload = { 
    type: WSMessageType.SESSION_CREATED, 
    sessionId,
    clientId, 
    gameStatus: newSession.gameStatus, 
    players: newSession.players 
  };

  ws.send(JSON.stringify(payload)); // Notify the client about the created session
};

// Handle a client's request to join an existing game session
export const joinSession = async (data: any, clientId: string, ws: WebSocket) => {
  const sessionId = data.sessionId;


  if (!sessions[sessionId]) {
    sendSessionError(ws, 'Session not found!');
    return;
  }

  const session = sessions[sessionId];
  const user = await createUserWithAvatar(data.telegramData, clientId);
  
  if (session.players.length < 2) {
    // If the session has less than 2 players, let this client join as a player
    const player: IPlayer = { ...user, score: 0, isCurrentMove: false };
    session.players.push(player);
    session.gameStatus.started = true;
    session.players[0].isCurrentMove = true;
  } else {
    // Otherwise, this client joins as a spectator
    session.spectators.push(user);
  }

  const payload = {
    type: WSMessageType.SESSION_JOINED,
    sessionId,
    gameStatus: session.gameStatus,
    clientId,
    players: session.players,
    spectators: session.spectators
  };

  // Notify all clients in the session about the new participant
  sendToAllClientsInSession(session, connectedClients, payload);
};
