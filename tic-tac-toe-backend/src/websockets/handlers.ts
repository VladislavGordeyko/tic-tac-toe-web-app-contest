import WebSocket from 'ws';
import { createSession, joinSession } from './session';
import { gameMove, restartGame } from './game';
import { connectedClients, sessions } from './ws';
import { getInitialGameStatus, getRemainingPlayers, getRemainingSpectators, sendToAllClientsInSession } from './utils';
import { IGamePayload, WSMessageType } from './models';

// Handle messages received on the WebSocket.
export const handleMessage = async (message: WebSocket.Data, clientId: string, ws: WebSocket) => {
  const data = JSON.parse(message.toString());

  switch (data.type) {
  case 'CREATE_SESSION':
    await createSession(data, clientId, ws);
    break;
  case 'JOIN_SESSION':
    await joinSession(data, clientId, ws);
    break;
  case 'MOVE':
    gameMove(data, ws);
    break;
  case 'RESTART_GAME':
    restartGame(data);
    break;
  default:
    break; 
  }
};

// Handle the event when a client disconnects. It removes the client from the 
// global list and also performs necessary cleanup from any sessions they were part of.
export const handleClose = (clientId: string) => {
  // Cleanup: Remove the disconnected client from connectedClients and any session they're part of
  delete connectedClients[clientId];
      
  for (const sessionId in sessions) {
    const session = sessions[sessionId];

    // Remove the disconnected client from players and spectators
    session.players = getRemainingPlayers(session.players, clientId);
    session.spectators = getRemainingSpectators(session.spectators, clientId);
          
    // If no remaining players in the session, delete the session.
    if (session.players.length === 0) {
      delete sessions[sessionId];
      continue;
    }

    // If players remain, assign the turn to the next available player
    const gameStatus = getInitialGameStatus();
    gameStatus.currentMoveClientId = session.players[0].clientId;
    sessions[sessionId].gameStatus = gameStatus;

    const payload : IGamePayload = {
      type: WSMessageType.USER_DISCONNECTED,
      gameStatus,
      players: session.players,
      spectators: session.spectators,
    };

    // Notify other clients in the session about the disconnection
    sendToAllClientsInSession(session, connectedClients, payload);
  }
};