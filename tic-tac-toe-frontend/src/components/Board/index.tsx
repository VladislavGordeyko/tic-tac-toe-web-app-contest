
import React from 'react';
import Rows from '../Rows';
import { IBoard } from './models';
import styles from './board.module.scss';

const Board: React.FC<IBoard> = ({ squares, onClick }) => {
  return (
    <div className={styles.board}>
      <Rows squares={squares} onClick={onClick} />
    </div>
  );
};

export default Board;