import React, { useEffect, useRef } from 'react';
import { ISquare } from './models';
import { animateXorO } from './animations';
import styles from './square.module.scss';

const Square: React.FC<ISquare> = ({ value, onClick }) => {
  const squareRef = useRef(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    animateXorO(value, squareRef, circleRef);
  }, [value]);

  return (
    <button 
      className={`${styles.square} ${value ? value === 'X' ? 'X' : 'O' : ''}`}
      onClick={onClick}
    >
      {value === 'X' && 
      <svg ref={squareRef} preserveAspectRatio="xMidYMid meet"  className={styles['square__container']} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {/* topRightToCenter */}
        <line x1="90" y1="10" x2="50" y2="50" stroke="var(--tg-theme-link-color, black)" strokeWidth="2" opacity={0} />
        {/* centerToBottomLeft */}
        <line x1="50" y1="50" x2="10" y2="90" stroke="var(--tg-theme-link-color, black)" strokeWidth="2" opacity={0} />
        {/* topLeftToCenter */}
        <line x1="10" y1="10" x2="50" y2="50" stroke="var(--tg-theme-link-color, black)" strokeWidth="2" opacity={0} />
        {/* centerToBottomRight */}
        <line x1="50" y1="50" x2="90" y2="90" stroke="var(--tg-theme-link-color, black)" strokeWidth="2" opacity={0} />
      </svg>
      }
      {value === 'O' && 
          <svg className={styles.circle} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle 
              ref={circleRef} 
              cx="50" 
              cy="50" 
              r="40" 
              fill="none" 
              stroke="var(--tg-theme-link-color, black)" 
              strokeWidth="2"
              opacity={0}
            />
          </svg>
      }
    </button>
  );
};

export default Square;