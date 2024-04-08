import { Box, Button, useTheme } from '@mui/material';
import React from 'react';

interface ButtonProps {
  onClick: () => void;
}

const LoadButton: React.FC<ButtonProps> = ({ onClick }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(3)
    }}>
      <Button
        onClick={onClick}
        variant="contained"
      >
        Load Messages
      </Button>
    </Box>
  );
};

export default LoadButton;