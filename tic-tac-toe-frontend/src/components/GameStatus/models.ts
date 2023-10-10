import { IPlayer } from '@/entities/game';

export interface IPlayersLabel {
    players?: IPlayer[],
    status?: string,
    currentMoveClientId?: string,
}