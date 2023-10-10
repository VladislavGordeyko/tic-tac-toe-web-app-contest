
import React from 'react';
import Square from '../Square';
import { IRows } from './models';
import styles from './row.module.scss';

const Rows: React.FC<IRows> = ({squares, onClick} ) => {
  const rows = [
    { start: 0, end: 3, class: styles['row--top'] },
    { start: 3, end: 6, class: '' },
    { start: 6, end: 9, class: styles['row--bottom'] }
  ];

  return (
    <>
      {rows.map(row => (
        <div key={row.start} className={`${styles.row} ${row.class}`}>
          {Array.from({ length: row.end - row.start })
            .map((_, idx) => 
              <Square 
                value={squares[row.start + idx]} 
                onClick={() => onClick(row.start + idx)}
                key={row.start + idx}
              />
            )}
        </div>
      ))}
    </>
  );
};

export default Rows;