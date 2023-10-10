import { IGameStatus, IPlayer } from '@/entities/game';

export interface IGame {
    sessionId?: string,
    players?: IPlayer[],
    gameStatusUpdate?: IGameStatus,
    clientId: string,
    isSpectator?: boolean,
    onPlayersUpdate: (players: IPlayer[]) => void
}
