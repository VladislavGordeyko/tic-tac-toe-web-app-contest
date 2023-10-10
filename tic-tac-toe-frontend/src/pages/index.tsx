import React, { useEffect, useState } from 'react';
import styles from './home.module.scss';
import Button from '@/components/Button';
import Lobby from '@/components/Lobby';
import { GameType } from '@/entities/game';
import BOTGame from '@/components/Game/BOTGame';
import { WebSocketProvider } from '@/context/WebSocketContext';
import Tooltip from '@/components/Tooltip/indes';

const Home = () => {
  const [session, setSession] = useState<string>();
  const [chatId, setChatId] = useState<string>();
  const [gameType, setGameType] = useState<GameType>('Unnasigned');
  const [onlyAI, setOnlyAI] = useState(false);

  useEffect(() => {  
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();

    const data = window.Telegram.WebApp.initDataUnsafe.start_param  || 'chatId__-1001828521159';
    if (data) {
      if (data.includes('chatId')) {
        setChatId(data.split('__')[1]);
      } else if (data.includes('sessionId')) {
        setSession(data.split('__')[1]);
        setGameType('Player');
      } else if (data.includes('onlyAI')) {
        setOnlyAI(true);
      }
    }
  }, []);

  const onBack = () => {
    setGameType('Unnasigned');
  };

  const renderMainComponent = () => {
    switch (gameType) {
    case 'BOT': return <BOTGame />;
    case 'Player': return(
      <WebSocketProvider sessionId={session}>
        <Lobby chatId={chatId} session={session} onBack={onBack} />
      </WebSocketProvider>
    );
    default:
    case 'Unnasigned': return <>
      <span className={styles['home__title']}>Tic Tac Toe</span>
      <div className={styles['home__buttons']}>
        <div className={styles['home__play-vs-friends']}>
          {onlyAI && <Tooltip message='You need to add the bot to the group and start from there to play against your friends.' />}
          <Button onClick={() => setGameType('Player')} text='Play vs friend' disabled={onlyAI}/>
        </div>
        <Button onClick={() => setGameType('BOT')} text='Play vs Bot'/>
      </div>
    </>;
    }
  };

  return (
    <main className={styles.home}>
      {renderMainComponent()}
    </main>
  );
};

export default Home;
