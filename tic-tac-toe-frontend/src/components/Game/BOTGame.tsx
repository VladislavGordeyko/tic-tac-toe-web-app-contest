
import React, { useState, useEffect } from 'react';
import Board from '../Board';
import { SquareValue } from '../Square/models';
import { bestMove, calculateWinner } from './utils';
import GameStatus from '../GameStatus';

const BOTGame: React.FC = () => {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState(calculateWinner(squares));
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (winner || !squares.includes(null)) {
      window.Telegram.WebApp.MainButton.text = 'Restart Game';
      window.Telegram.WebApp.MainButton.show();
      window.Telegram.WebApp.MainButton.onClick(restartGame);
    }
  },[winner, squares]);
  
  useEffect(() => {
    if (winner) {
      setStatus(`Winner: ${winner}`);
    } else if (!squares.includes(null)) {
      setStatus('Draw!');
    } else {
      setStatus(`Next player: ${isXNext ? 'X' : 'O'}`);
    }
  }, [winner, squares]);
  
  useEffect(() => {
    setWinner(calculateWinner(squares));
  }, [squares]);
  
  const makeMove = (index: number) => {
    const squaresCopy = squares.slice();
    squaresCopy[index] = 'O';
    setSquares(squaresCopy);
    setIsXNext(true);
  };
  
  useEffect(() => {
    if (!isXNext && !calculateWinner(squares)) {
      const move = bestMove(squares, 'O');
      if (move !== -1) makeMove(move);
    }
  }, [squares, isXNext]);
  
  const restartGame = ()  => {
    window.Telegram.WebApp.MainButton.hide();
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };
  
  const handleClick = (index: number) => {
    if (squares[index] || winner) return;
    const squaresCopy = squares.slice();
    squaresCopy[index] = isXNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setIsXNext(!isXNext);
  };

  return (
    <>
      <GameStatus status={status} />
      <Board squares={squares} onClick={handleClick} status={status || ''} />   
    </>
    
  );
};

export default BOTGame;