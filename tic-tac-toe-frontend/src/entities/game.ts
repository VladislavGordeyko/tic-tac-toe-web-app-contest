import { SquareValue } from '@/components/Square/models';

export type GameType = 'Player' | 'BOT' | 'Unnasigned';

export interface IGameStatus {
    squares: SquareValue[],
    currentMoveClientId: string,
    isXNext: boolean,
    isFinished: boolean,
    winner: SquareValue,
    winnerUserName: string,
    started: boolean,
    status: string,
}

export interface IBaseClient {
    clientId: string,
    userName?: string,
    tgId: string,
    avatar: string,
}
export interface IPlayer extends IBaseClient {
    score: number,
    isCurrentMove: boolean
}