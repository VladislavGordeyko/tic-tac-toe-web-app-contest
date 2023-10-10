import { RefObject }from 'react';
import { gsap } from 'gsap';
import { SquareValue } from './models';

export const animateXorO = (value:SquareValue, squareRef: RefObject<SVGCircleElement>, circleRef:RefObject<SVGCircleElement> ) => {
  if (value === 'X' && squareRef.current ) {
    const lineLength = Math.sqrt(42*42 + 40*40);

    const animateLineFromCenter = (lineID:Element, number: number, delay?: number) => {
      gsap.fromTo(lineID, 
        { 
          strokeDasharray: `${lineLength} ${lineLength}`,
          opacity: 1,
          strokeDashoffset: number * lineLength 
        },
        { 
          delay: delay,
          strokeDashoffset: 0, 
          duration: 1,
          ease: 'power4.inOut'
        }
      );
    };
    animateLineFromCenter(squareRef.current.children[0], -1);
    animateLineFromCenter(squareRef.current.children[1], 1);
    animateLineFromCenter(squareRef.current.children[2], -1, 0.2);
    animateLineFromCenter(squareRef.current.children[3], 1, 0.2);
  

  } else if (value === 'O' && circleRef.current) {
    const circumference = 2 * Math.PI * 40;
    gsap.fromTo(circleRef.current, 
      { 
        strokeDasharray: `${circumference} ${circumference}`,
        strokeDashoffset: circumference,
        opacity: 1,
      },
      { 
        strokeDashoffset: 0, 
        duration: 1.2,
        ease: 'power4.inOut',
      }
    );
  }
};