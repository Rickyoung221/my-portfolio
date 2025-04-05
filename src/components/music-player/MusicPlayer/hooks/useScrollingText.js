import { useEffect, useRef, useState } from 'react';

export const useScrollingText = (text, delay = 3000) => {
  const elementRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      const element = elementRef.current;
      if (element) {
        const isTextOverflow = element.scrollWidth > element.clientWidth;
        setIsOverflow(isTextOverflow);
        
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        if (isTextOverflow) {
          timeoutRef.current = setTimeout(() => {
            setShouldAnimate(true);
          }, delay);
        } else {
          setShouldAnimate(false);
        }
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    
    return () => {
      window.removeEventListener('resize', checkOverflow);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, delay]);

  return {
    elementRef,
    isOverflow,
    shouldAnimate,
    setShouldAnimate
  };
}; 