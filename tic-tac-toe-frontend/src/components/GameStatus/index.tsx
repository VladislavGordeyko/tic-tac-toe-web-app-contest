import React from 'react';
import { IPlayersLabel } from './models';
import styles from './gameStatus.module.scss';
import PlayerCard from './PlayerCard';
import EmptyCard from './EmptyCard';

const GameStatus: React.FC<IPlayersLabel> = ({ players, status }) => {
  return (
    <div className={styles['game-status']}>
      <div className={styles['game-status__text']}>{status}</div>
      <div className={styles['game-status__cards']}>
        {players && <>
          <PlayerCard player={players[0]} /> 
            VS
          {players[1] !== undefined ? 
            <PlayerCard player={players[1]} />  : 
            <EmptyCard />
          }
        </>}
      </div>  
    </div>
  );
};

export default GameStatus;