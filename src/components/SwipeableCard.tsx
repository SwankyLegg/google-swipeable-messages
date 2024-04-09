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

  const handleInputStart = (posX: number, posY: number) => {
    setStartX(posX);
    setStartY(posY);
    setSwiping(true);
    setIsScrolling(false); // Reset scrolling flag
  };

  const handleInputMove = (posX: number, posY: number) => {
    const diffX = Math.abs(posX - startX);
    const diffY = Math.abs(posY - startY);

    if (swiping && !isScrolling) {
      // Determine if the gesture is more horizontal or vertical
      if (diffY > diffX && diffY > 5) {
        // Lock swipe if vertical scrolling is dominant
        setIsScrolling(true);
      } else if (diffX > 5) {
        setSwiping(true);
        setCurrentX(posX - startX);
      }
      setCurrentX(posX - startX);
    }
  };

  // Handle mouse and touch end
  const handleInputEnd = () => {
    setSwiping(false);
    const threshold = window.outerWidth / 10;
    if (Math.abs(currentX) > threshold) {
      onSwipeAway(realId);
    } else {
      setCurrentX(0); // Reset position
    }
  };

  const cssX = Math.round(currentX);
  return (
    <Box
      onTouchStart={(evt) => {
        const { clientX, clientY } = evt.touches[0];
        handleInputStart(clientX, clientY);
      }}
      onTouchMove={(evt) => {
        const { clientX, clientY } = evt.touches[0];
        handleInputMove(clientX, clientY);
      }}
      onTouchEnd={handleInputEnd}
      onMouseDown={(evt) => handleInputStart(evt.clientX, evt.clientY)}
      onMouseMove={(evt) => {
        handleInputMove(evt.clientX, evt.clientY)
      }}
      onMouseUp={handleInputEnd}
      sx={{
        cursor: swiping ? 'grabbing' : 'grab',
        opacity: 1 - Math.min(1, Math.abs(2 * cssX) / 100),
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