import { IGamePayload, IPlayer, IClientArray, ISession, IBaseClient, SquareValue } from './models';

// Generate initial state for the game board and game status.
export function getInitialGameStatus(nextPlayerMove?: IPlayer, hasStarted?: boolean) {
  return {
    squares: Array(9).fill(null),
    isXNext: true,
    currentMoveClientId: nextPlayerMove?.clientId || '',
    isFinished: false,
    winner: null,
    started: hasStarted || false,
    status: nextPlayerMove ? `Next player: ${nextPlayerMove.userName}` : 'Waiting for another player to join'
  };
}

// Finds a player from a list based on client ID.
export const findPlayerByClientId = (players: Array<any>, clientId: string)  =>
  players.find(player => player.clientId === clientId);


// Finds an opponent from a list based on client ID.
export const findOpponentByClientId = (players:Array<any>, clientId: string) =>
  players.find(player => player.clientId !== clientId);

// Get a list of players that remain after removing a specified player by client ID.
export const getRemainingPlayers = (players: IPlayer[], clientId: string) : IPlayer[] => {
  return players.filter(player => player.clientId !== clientId);
};

// Get a list of spectators that remain after removing a specified spectator by client ID.
export const getRemainingSpectators = (spectators: IBaseClient[], clientId: string) => {
  return spectators.filter(spectator => spectator.clientId !== clientId);
};

//  Resets the move state for all players.
export const clearPlayersMove = (players: IPlayer[]) => {
  players.map(player => player.isCurrentMove = false);
};

// Sends a payload to all clients within a specified session.
export const sendToAllClientsInSession = (session: ISession, connectedClients: IClientArray, payload: IGamePayload) => {
  session.players.concat(session.spectators as IPlayer[]).forEach(user => {
    connectedClients[user.clientId].ws.send(JSON.stringify(payload));
  });
};

// Randomly selects a player from a list to make the next move.
export const getRandomPlayerForNextMove = (players: IPlayer[]) => {
  const randomIndex = Math.floor(Math.random() * players.length);
  return players[randomIndex];
};

// Calculates the winner of the game based on the current board state.
export const calculateWinner = (squares: SquareValue[]): SquareValue => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};