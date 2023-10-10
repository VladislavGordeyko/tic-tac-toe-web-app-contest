import WebSocket from 'ws';

export type SquareValue = 'X' | 'O' | null;

export enum WSMessageType {
  CREATE_SESSION = 'CREATE_SESSION',
  SESSION_CREATED = 'SESSION_CREATED',
  SESSION_JOINED = 'SESSION_JOINED',
  JOIN_SESSION = 'JOIN_SESSION',
  MOVE = 'MOVE',
  RESTART_GAME = 'RESTART_GAME',
  SESSION_ERROR = 'SESSION_ERROR',
  ERROR = 'ERROR',
  USER_DISCONNECTED = 'USER_DISCONNECTED'
}

export interface IGamePayload  {
  type: WSMessageType,
  sessionId?: string,
  clientId?: string,
  gameStatus?: IGameStatus,
  players?: IPlayer[],
  spectators?: IBaseClient[],
  message?: string,
}

export interface ITelegramData  {
    user: {
      id: string,
      first_name: string, 
      last_name: string, 
      language_code: string, 
      username: string,
    }
    start_param?: string,
  }
  
export interface IClient  {
      clientId: string;
      ws: WebSocket;
    }
  
export interface IBaseClient  {
      clientId: string,
      userName: string,
      tgId: string,
      avatar?: string,
    }
  
export interface IPlayer extends IBaseClient {
      score: number,
      isCurrentMove: boolean,
    }
  
export interface IGameStatus  {
      squares: SquareValue[],
      currentMoveClientId: string,
      isXNext: boolean,
      isFinished: boolean,
      winner: SquareValue,
      winnerUserName?: string,
      started: boolean,
      status: string,
    }
  
export interface ISession  {
      id: string;
      players: IPlayer[];
      spectators: IBaseClient[];
      gameStatus: IGameStatus;
    }

export interface ISessionArray { 
      [id: string]: ISession 
    }

export interface IClientArray { 
      [clientId: string]: IClient
    }