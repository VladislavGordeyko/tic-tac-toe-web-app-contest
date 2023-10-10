import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ITooltip } from './models';
import styles from './tooltip.module.scss';

const Tooltip: React.FC<ITooltip> = ({ message }) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef(null);
  const questionMarkRef = useRef(null);
  const messageRef = useRef(null);

  const toggleTooltip = () => {
    const tl = gsap.timeline();

    if (!isOpen) {
      tl.to(questionMarkRef.current, { opacity: 0, duration: .2})
        .to(tooltipRef.current, { width: '100%', height: '45px', borderRadius: '5px', duration: 0.5 })
        .to(messageRef.current, { opacity: 1, duration: 0.2 });
    } else {
      tl.to(messageRef.current, { opacity: 0, duration: .2 })
        .to(tooltipRef.current, { width: '24px', height: '24px', duration: 0.5 })
        .to(tooltipRef.current, { borderRadius: '50%', duration: 0.2 })
        .to(questionMarkRef.current, { opacity: 1, duration: 0.2 });
    }

    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.icon} ref={tooltipRef} onClick={toggleTooltip}>
        <span ref={questionMarkRef}>?</span>
        <span ref={messageRef} className={styles.message}>{message}</span>
      </div>
    </div>
  );
};

export default Tooltip;