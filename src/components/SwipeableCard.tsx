import { Box } from '@mui/material';
import React, { useState } from 'react';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeAway: (realId: string) => void;
  realId: string;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children, 
  onSwipeAway,
  realId
}) => {
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [currentX, setCurrentX] = useState<number>(0);
  const [swiping, setSwiping] = useState<boolean>(false);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const handleTouchStart = (event: React.TouchEvent) => {
    setStartX(event.touches[0].clientX);
    setStartY(event.touches[0].clientY);
    setIsScrolling(false);  // Reset scrolling flag on new touch
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    const diffX = Math.abs(touchX - startX);
    const diffY = Math.abs(touchY - startY);

    if (!isScrolling) {
      // Determine if the gesture is more horizontal or vertical
      if (diffY > diffX && diffY > 1) {
        // Lock swipe if vertical scrolling is dominant
        setIsScrolling(true);
      } else if (diffX > 1) {
        setSwiping(true);
        setCurrentX(touchX - startX);
      }
      setCurrentX(touchX - startX);
    }
  };

  const handleTouchEnd = () => {
    setSwiping(false);
    // Swipe threshold
    const threshold = window.outerWidth / 5;
    if (Math.abs(currentX) > threshold) {
      onSwipeAway(realId);
    } else {
      setCurrentX(0); // Reset position
    }
  };

  const cssX = Math.round(currentX);

  return (
    <Box
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      sx={{
        opacity: 1 - Math.min(1, Math.abs(cssX) / 100),
        transform: `translate3d(${cssX}px,0,0)`,
        transitionDuration: swiping ? 0 : '300ms',
        transitionProperty: 'opacity, transform',
        transitionTimingFunction: 'ease',
        willChange: 'opacity, transform',
        zIndex: 0,
      }}
    >
      {children}
    </Box>
  );
};

export default SwipeableCard;