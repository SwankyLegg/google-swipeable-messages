import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import AppHeader from './components/AppHeader'
import theme from './theme';
import MessageList from './components/MessageList';

dayjs.extend(relativeTime);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader />
      <Container sx={{
        // paddingBlockStart: theme.spacing(8)
        padding: 0
      }}>
        <MessageList />
      </Container>
    </ThemeProvider>
  )
}

export default App
