import React from 'react';
import { IPlayerCard } from './models';
import Image from 'next/image';
import styles from './playerCard.module.scss';


const PlayerCard: React.FC<IPlayerCard> = ({ player }) => {
  return (
    <div className={styles['player-card']}>
      <div className={`${styles['player-card__image-container']} ${player?.isCurrentMove && styles['player-card__image-container--active']}`}>
        {player?.avatar ?  <Image
          className={styles['player-card__image']} 
          alt='player-avatar'
          height={50}
          width={50}
          src={player.avatar}
        /> : 
          <div className={styles['player-card__image-fill']}>
            <Image 
              className={styles['player-card__image-mock']} 
              alt='player-avatar-mock'
              height={25}
              width={25}
              src='/assets/smile.svg'
            />
          </div>
        }
        {player?.score > 0 && <div className={styles['player-card__score']}>
          {player.score}
        </div>}
      </div>   
      <span className={styles['player-card__name']}>{player?.userName}</span>
    </div>
  );
};

export default PlayerCard;