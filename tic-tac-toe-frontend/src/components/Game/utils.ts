import { SquareValue } from '../Square/models';

export const calculateWinner = (squares: SquareValue[]): SquareValue => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export const randomMove = (squares: SquareValue[]) => {
  const availableSquares = squares.map((square, index) => (square === null ? index : null)).filter(square => square !== null);
  if (availableSquares.length) {
    return availableSquares[Math.floor(Math.random() * availableSquares.length)];
  }
  return null;
};

export const findWinningMove = (squares: SquareValue[], player: SquareValue) => {
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      const squaresCopy = squares.slice();
      squaresCopy[i] = player;
      if (calculateWinner(squaresCopy) === player) {
        return i;
      }
    }
  }
  return null;
};

export const  minimax = (squares: SquareValue[], player: SquareValue): number => {
  const winner = calculateWinner(squares);
  if (winner === 'O') return +10;
  if (winner === 'X') return -10;

  if (!squares.includes(null)) return 0; // Draw

  let moves = [];
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      const squaresCopy = squares.slice();
      squaresCopy[i] = player;

      if (player === 'O') {
        const g = minimax(squaresCopy, 'X');
        moves.push(g - 1); // The farther from root, the less preferred
      } else {
        const g = minimax(squaresCopy, 'O');
        moves.push(g + 1);
      }
    }
  }
  if (player === 'O') {
    return Math.max(...moves);
  } else {
    return Math.min(...moves);
  }
};

export const bestMove = (squares: SquareValue[], player: SquareValue): number => {
  let bestScore = -Infinity;
  let move = -1;

  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      const squaresCopy = squares.slice();
      squaresCopy[i] = player;
      const score = minimax(squaresCopy, 'X');

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
};