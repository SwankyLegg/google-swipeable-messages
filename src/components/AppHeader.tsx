import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Container, IconButton, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const AppHeader: React.FC = () => {
  const theme = useTheme();
  return (
    <AppBar
      enableColorOnDark
      sx={{
        height: 64
      }}
    >
      <Container sx={{
        alignItems: 'center',
        display: 'flex',
        height: '100%'
      }}>
        <IconButton sx={{
          color: theme.palette.primary.contrastText,
        }}>
          <MenuIcon />
        </IconButton>
        <Typography
          sx={{
            fontWeight: 500,
            marginInlineStart: '1em'
          }}
          variant={'h5'}
        >
          Messages
        </Typography>
      </Container>
    </AppBar>
  );
};

export default AppHeader;