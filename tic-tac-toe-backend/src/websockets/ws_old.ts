// import { Server } from 'ws';
// import WebSocket from 'ws';
// import { v4 as uuidv4 } from 'uuid';
// import { SquareValue } from '../models/tictactoe';
// import { calculateWinner } from '../utils/tictactoe';
// import { getUserPhotoLink } from '../telegram/apiCommands';
// import bot from '../telegram';
// import { getInitialGameStatus } from './utils';

// type TelegramData = {
//   user: {
//     id: string,
//     first_name: string, 
//     last_name: string, 
//     language_code: string, 
//     username: string,
//   }
//   start_param?: string,
// }

// type Client = {
//     clientId: string;
//     ws: WebSocket;
//   };

//   type BaseClient = {
//     clientId: string,
//     userName: string,
//     tgId: string,
//     avatar?: string,
//   }

//   interface Player extends BaseClient {
//     score: number,
//     isCurrentMove: boolean,
//   }

//   type GameStatus = {
//     squares: SquareValue[],
//     currentMoveClientId: string,
//     isXNext: boolean,
//     isFinished: boolean,
//     winner: SquareValue,
//     winnerUserName?: string,
//     started: boolean,
//     status: string,
//   }

//   type Session = {
//     id: string;
//     players: Player[];  // Array of players
//     spectators: BaseClient[];
//     gameStatus: GameStatus;
//   };
  
// const connectedClients: { [clientId: string]: Client } = {};
// const sessions: { [id: string]: Session } = {};

// const setupWebSocket = (server: any) => {
//   const wss = new Server({ server });

//   wss.on('connection', (ws: WebSocket) => {
//     const clientId = uuidv4();
//     connectedClients[clientId] = { clientId, ws };
//     console.log('connection');

//     ws.send(JSON.stringify({ type: 'CLIENT_ID', clientId }));

   
//     ws.on('message', async (message: WebSocket.Data) => {
//       const data = JSON.parse(message.toString());

//       switch (data.type) {
//         case 'CREATE_SESSION':
//             const sessionId = uuidv4();
//             const userData : TelegramData = data.telegramData;
//             console.log('USER DATA', userData);
//             const avatar = await getUserPhotoLink(bot, userData.user?.id);
            
//             const initGameStatus =  getInitialGameStatus();
//             initGameStatus.currentMoveClientId = clientId;
//             const newSession: Session = {
//             id: sessionId,
//             spectators: [],
//             players: [{
//               clientId,
//               userName: userData.user?.username || userData.user?.first_name || 'anonymous',
//               tgId: userData.user?.id,
//               score: 0,
//               isCurrentMove: true,
//               avatar: avatar,
//             }],
//             gameStatus: initGameStatus
//             };

//             sessions[sessionId] = newSession;
//             // console.log({connectedClients}, {sessions})
//             ws.send(JSON.stringify({ 
//               type: 'SESSION_CREATED', 
//               sessionId, 
//               clientId, 
//               gameStatus: newSession.gameStatus,
//               players: newSession.players,
//             }));
//             console.log('SESSION CREATED', sessionId, {data})
//             break;
        
//         case 'JOIN_SESSION':
//             const joinSessionId = data.sessionId;
//             // console.log('try to connect', {joinSessionId}, sessions[joinSessionId], sessions[joinSessionId]?.players.length)
//             if (sessions[joinSessionId]) {
//               const userData: TelegramData = data.telegramData;
//               // console.log('USER DATA', userData);
//               const avatar = await getUserPhotoLink(bot, userData.user.id);
//               console.log("players len", sessions[joinSessionId].players.length,sessions[joinSessionId].players.length < 2 )
//               if (sessions[joinSessionId].players.length < 2) {
//                 const newPlayer: Player = {
//                   clientId,
//                   userName: userData.user.username || userData.user?.first_name || 'anonymous',
//                   tgId: userData.user.id,
//                   score: 0,
//                   isCurrentMove: false,
//                   avatar: avatar
//                 };
//                 sessions[joinSessionId].players.push(newPlayer);
              
//               } else {
//                 const newSpectator: BaseClient = {
//                   clientId,
//                   userName: userData.user?.username || userData.user?.first_name || 'anonymous',
//                   tgId: userData.user.id,
//                   avatar: avatar
//                 };
//                 sessions[joinSessionId].spectators.push(newSpectator);
//               }
             
              
//               // ws.send(JSON.stringify({ type: 'SESSION_JOINED', sessionId: joinSessionId }));
//               const session = sessions[joinSessionId];
//               session.players.forEach(player => {
//                 if (connectedClients[player.clientId]) {
//                   console.log('SESSION_JOINED', {clientId}, sessions[joinSessionId].players, {data})
//                   session.gameStatus.started = true;
//                   const user = session.players.filter(player => player.clientId === clientId)[0];
//                   session.gameStatus.status = `Next player: ${user?.userName ? user.userName : 'X'}`;
//                   connectedClients[player.clientId].ws.send(JSON.stringify({ 
//                     type: 'SESSION_JOINED', 
//                     sessionId: joinSessionId,
//                     gameStatus: session.gameStatus,
//                     clientId: clientId,
//                     players: session.players,
//                     spectators: session.spectators
//                   }));

//                 }
//               });
//               session.spectators.forEach(spectator => {
//                 if (connectedClients[spectator.clientId]) {
//                   console.log('SESSION_JOINED', {clientId}, sessions[joinSessionId].players, {data});
//                   connectedClients[spectator.clientId].ws.send(JSON.stringify({ 
//                     type: 'SESSION_JOINED', 
//                     sessionId: joinSessionId,
//                     gameStatus: session.gameStatus,
//                     clientId: clientId,
//                     players: session.players,
//                     spectators: session.spectators
//                   }));

//                 }
//               });
//               console.log("spectators:", session.spectators, "players:", session.players)
            
//             } else {
//               ws.send(JSON.stringify({ type: 'SESSION_ERROR', message: 'Session not found or full.' }));
//               console.log('SESSION_ERROR', 'Session not found or full.')
//             }
//             break;

//           case 'MOVE':
//               const moveSessionId = data.sessionId;
//               const squareIndex = data.index;
//               const currentClientId = data.clientId;
//               console.log('MOVE', {squareIndex}, {moveSessionId})
      
//               if (sessions[moveSessionId]) {
//                 const session = sessions[moveSessionId];
//                 const { gameStatus } = session;
//                 if (gameStatus.squares[squareIndex] === null) {
//                   const curentPlayer = session.players.filter(player => player.clientId === currentClientId)[0];
//                   const opponent = session.players.filter(player => player.clientId !== currentClientId)[0];
//                   gameStatus.squares[squareIndex] = gameStatus.isXNext ? 'X' : 'O';
//                   gameStatus.isXNext = !gameStatus.isXNext;
//                   gameStatus.currentMoveClientId = opponent.clientId;
//                   gameStatus.winner = calculateWinner(gameStatus.squares);

//                   if (gameStatus.winner) {
//                     gameStatus.isFinished = true;
//                     const winner = session.players.filter(i => i.clientId === currentClientId)[0];
//                     gameStatus.winnerUserName = winner.userName;
//                     winner.score += 1;
//                     winner.isCurrentMove = false;
//                     console.log('winner score', session.players.filter(i => i.clientId === currentClientId)[0].score)
//                     gameStatus.status = `Winner: ${gameStatus.winnerUserName}!`;

//                   } else if (!gameStatus?.squares.includes(null)) {
//                     gameStatus.status = 'Draw!';
//                     gameStatus.isFinished = true;
//                   } else {
//                     opponent.isCurrentMove = true;
//                     curentPlayer.isCurrentMove = false;
//                     gameStatus.status = `Next player: ${opponent.userName ? opponent.userName : gameStatus.isXNext ? 'X' : 'O'}`;
//                   }
                  
//                   // Broadcasting the updated state to both players
//                   session.players.forEach(player => {
//                     if (connectedClients[player.clientId]) {
//                       connectedClients[player.clientId].ws.send(JSON.stringify({ 
//                         type: 'MOVE', 
//                         gameStatus: session.gameStatus,
//                         players: session.players,
//                       }));
//                     }
//                   });
//                   session.spectators.forEach(spectator => {
//                     if (connectedClients[spectator.clientId]) {
//                       connectedClients[spectator.clientId].ws.send(JSON.stringify({ 
//                         type: 'MOVE', 
//                         gameStatus: session.gameStatus,
//                         players: session.players,
//                       }));
//                     }
//                   });
//                 }
//               } else {
//                 ws.send(JSON.stringify({ type: 'ERROR', message: 'Invalid session.' }));
//               }
//               break;


//           case 'RESTART_GAME':
//               const restartSessionId = data.sessionId;
//               if (sessions[restartSessionId]) {
//                 const session = sessions[restartSessionId];
//                 const random = Math.floor(Math.random() * session.players.length);
//                 const nextPlayerMove = session.players[random];
//                 nextPlayerMove.isCurrentMove = true;
//                 session.gameStatus = {
//                   squares: Array(9).fill(null),
//                   isXNext: true,
//                   currentMoveClientId: nextPlayerMove.clientId,
//                   isFinished: false,
//                   winner: null,
//                   started: true,
//                   status: `Next player: ${nextPlayerMove.userName}`
//                 };
//                 console.log('players', session.players)
//                 session.players.forEach(player => {
//                   if (connectedClients[player.clientId]) {
//                     connectedClients[player.clientId].ws.send(JSON.stringify({ 
//                       type: 'RESTART_GAME', 
//                       gameStatus: session.gameStatus,
//                       players: session.players,
//                     }));
//                   }
//                 });
//                 session.spectators.forEach(spectator => {
//                   if (connectedClients[spectator.clientId]) {
//                     connectedClients[spectator.clientId].ws.send(JSON.stringify({ 
//                       type: 'RESTART_GAME', 
//                       gameStatus: session.gameStatus,
//                       players: session.players,
//                     }));
//                   }
//                 });
//               }
             
//               break;

//         default:
//           break;
//       }
//     });

//     ws.on('close', () => {
//       console.log('Close')
      
//       // Cleanup: Remove the disconnected client from connectedClients and any session they're part of
//       delete connectedClients[clientId];
      
//       for (const sessionId in sessions) {
//         const remainingPlayers = sessions[sessionId].players.filter(player => player.clientId !== clientId);
//         sessions[sessionId].players = remainingPlayers;
//         const remainingSpectators = sessions[sessionId].spectators.filter(specatator => specatator.clientId !== clientId);
//         sessions[sessionId].spectators = remainingSpectators;
          
//           // If no remaining players in the session, delete the session.
//           if (remainingPlayers.length === 0) {
//             delete sessions[sessionId];
//             continue;  // Skip to next iteration as there's no session left to notify
//         }

//         // Assign the clientId of the first remaining player to gameStatus
//         const gameStatus = getInitialGameStatus();
//         gameStatus.currentMoveClientId = remainingPlayers[0].clientId
//         sessions[sessionId].gameStatus = gameStatus;
//         // Notify the remaining players that someone has disconnected
//         remainingPlayers.forEach(player => {
//             if (connectedClients[player.clientId]) {
//                 connectedClients[player.clientId].ws.send(JSON.stringify({ 
//                     type: 'USER_DISCONNECTED',
//                     gameStatus: gameStatus,
//                     players: remainingPlayers,
//                     spectators: remainingSpectators,
//                 }));
//             }
//         });

//         // Notify the spectators about the disconnect
//         sessions[sessionId].spectators.forEach(spectator => {
//             if (connectedClients[spectator.clientId]) {
//                 connectedClients[spectator.clientId].ws.send(JSON.stringify({ 
//                     type: 'USER_DISCONNECTED',
//                     gameStatus: gameStatus,
//                     players: remainingPlayers,
//                     spectators: remainingSpectators,
//                 }));
//             }
//         });;
//       }
//   });
  
//   });
// };

// export default setupWebSocket;
