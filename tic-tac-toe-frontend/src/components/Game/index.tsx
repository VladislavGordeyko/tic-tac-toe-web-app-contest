
import React, { useState, useEffect } from 'react';
import Board from '../Board';
import { IGame } from './models';
import { IGameStatus, IPlayer } from '@/entities/game';
import { useWebSocketContext } from '@/context/WebSocketContext';
import GameStatus from '../GameStatus';

const Game: React.FC<IGame> = ({ 
  sessionId, 
  players,
  gameStatusUpdate, 
  clientId, 
  isSpectator = false,
  onPlayersUpdate
}) => {
  const [gameStatus, setGameStatus] = useState<IGameStatus>();
  const { sendMessage, lastMessage } = useWebSocketContext();

  useEffect(() => {
    if (gameStatusUpdate) {
      setGameStatus(gameStatusUpdate);
    }
  }, [gameStatusUpdate]);

  const restartGame = ()  => {
    window.Telegram.WebApp.MainButton.hide();
    sendMessage(JSON.stringify({ type: 'RESTART_GAME', sessionId }));
  };

  useEffect(() => {
    if (gameStatus?.isFinished && !isSpectator) {
      window.Telegram.WebApp.MainButton.text = 'Restart Game';
      window.Telegram.WebApp.MainButton.show();
      window.Telegram.WebApp.MainButton.onClick(restartGame);
    }
  }, [gameStatus?.isFinished, isSpectator]);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      switch (data.type) {
      case 'MOVE':
        setGameStatus(data.gameStatus);
        onPlayersUpdate(data.players);
        break;

      case 'RESTART_GAME':
        setGameStatus(data.gameStatus);
        onPlayersUpdate(data.players);
        window.Telegram.WebApp.MainButton.hide();
        break;

      default:
        break;
      }
    }
  }, [lastMessage]);


  const handleClick = (index: number) => {
    if (gameStatus?.squares[index] || gameStatus?.winner) return;
    if (clientId === gameStatus?.currentMoveClientId && gameStatus.started) {
      sendMessage(JSON.stringify({ type: 'MOVE', sessionId, clientId, index  }));
    }
  };

  return (
    <>
      <GameStatus 
        players={players} 
        status={gameStatus?.status}
        currentMoveClientId={gameStatus?.currentMoveClientId} 
      />
      <Board 
        squares={gameStatus?.squares || Array(9).fill(null)} 
        onClick={handleClick} 
        status={gameStatus?.status || ''} 
      />
    </>
   
  );
};

export default Game;