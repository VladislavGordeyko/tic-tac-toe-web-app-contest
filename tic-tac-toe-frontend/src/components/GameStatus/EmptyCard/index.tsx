import React from 'react';
import styles from './emptyCard.module.scss';

const EmptyCard = () => {
  return (
    <div className={styles['empty-card']}>
      <picture>
        <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f914/512.webp" type="image/webp"/>
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f914/512.gif" alt="🤔" width="32" height="32"/>
      </picture>
    </div>
  );
};

export default EmptyCard;