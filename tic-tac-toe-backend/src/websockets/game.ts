import WebSocket from 'ws';
import { calculateWinner, clearPlayersMove, findOpponentByClientId, findPlayerByClientId, getInitialGameStatus, getRandomPlayerForNextMove, sendToAllClientsInSession } from './utils';
import { connectedClients, sessions } from './ws';
import { sendSessionError } from './error';
import { IGamePayload, IGameStatus, IPlayer, WSMessageType } from './models';

// Concludes the game session by marking the given player as the winner
const concludeGameAsWon = (winner: IPlayer, gameStatus: IGameStatus) => {
  gameStatus.isFinished = true;
  gameStatus.winnerUserName = winner.userName;
  winner.score += 1;
  winner.isCurrentMove = false;
  gameStatus.status = `Winner: ${gameStatus.winnerUserName}!`;
};

// Concludes the game session as a draw
const concludeGameAsDraw = (gameStatus: IGameStatus) => {
  gameStatus.status = 'Draw!';
  gameStatus.isFinished = true;
};
  
// Updates the game status to continue with the next move
const continueGame = (currentPlayer: IPlayer, opponent: IPlayer, gameStatus: IGameStatus) => {
  opponent.isCurrentMove = true;
  currentPlayer.isCurrentMove = false;
  gameStatus.status = `Next player: ${opponent.userName ? opponent.userName : gameStatus.isXNext ? 'X' : 'O'}`;
};

// Processes a move in the game, updating the game state accordingly
export const gameMove = (data: any, ws: WebSocket) => {
  const sessionId = data.sessionId;

  if (!sessions[sessionId]) {
    sendSessionError(ws, 'Session not found!');
    return;
  }
  const session = sessions[sessionId];
  const { gameStatus } = session;
  const squareIndex = data.index;

  // Proceed only if the selected square is empty
  if (gameStatus.squares[squareIndex] === null) {
    const currentPlayer = findPlayerByClientId(session.players, data.clientId);
    const opponent = findOpponentByClientId(session.players, data.clientId);

    gameStatus.squares[squareIndex] = gameStatus.isXNext ? 'X' : 'O';
    gameStatus.isXNext = !gameStatus.isXNext;
    gameStatus.currentMoveClientId = opponent.clientId;
    gameStatus.winner = calculateWinner(gameStatus.squares);

    if (gameStatus.winner) {
      concludeGameAsWon(currentPlayer, gameStatus);
    } else if (!gameStatus.squares.includes(null)) {
      concludeGameAsDraw(gameStatus);
    } else {
      continueGame(currentPlayer, opponent, gameStatus);
    }

    const payload : IGamePayload = {
      type: WSMessageType.MOVE,
      gameStatus,
      players: session.players,
    }; 
      
    // Notify all clients in the session about the game update
    sendToAllClientsInSession(session, connectedClients, payload);
  }
};

// Resets the game state, allowing players to start a new round
export const restartGame = (data: any) => {
  const sessionId = data.sessionId;

  if (sessions[sessionId]) {
    const session = sessions[sessionId];
    clearPlayersMove(session.players); 
    const nextPlayerMove = getRandomPlayerForNextMove(session.players);
    nextPlayerMove.isCurrentMove = true;
    session.gameStatus = getInitialGameStatus(nextPlayerMove, true);
    const payload: IGamePayload = {
      type: WSMessageType.RESTART_GAME,
      gameStatus: session.gameStatus,
      players: session.players,
    };

    // Notify all clients about the game restart
    sendToAllClientsInSession(session, connectedClients, payload);
  }
};