import React, { useState, useEffect, useCallback } from 'react';
import Message from './Message';
import { Box, Button, useTheme } from '@mui/material';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const MessageList: React.FC = () => {
  // const [state, setState] = useState<State>(initialState);

  const theme = useTheme();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>();
  const [pageToken, setPageToken] = useState<string | null>();

  const fetchData = useCallback(async (pageToken: string | null = null) => {
    // setState(prevState => ({ ...prevState, loading: true }));
    setLoading(true);

    let url = 'http://message-list.appspot.com/messages';
    if (pageToken) {
      url += `?pageToken=${pageToken}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: MessagesResponse = await response.json();
      if (messages?.length > 0) {
        setMessages([...messages, ...data.messages]);
      } else if (data.messages) {
        setMessages(data.messages);
      }
      // setState(prevState => ({
      //   ...prevState,
      //   messages: [...prevState.messages, ...data.messages],
      //   pageToken: data.pageToken,
      // }));

      setPageToken(data.pageToken);
      console.info(messages);
    } catch (error) {
      setError(error.message);
      // setState(prevState => ({ ...prevState }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(null);
  }, [fetchData]);

  const rowHeights = new Array(99)
  .fill(true)
  .map(() => 80 + Math.round(Math.random() * 50));

  const getItemSize = (idx: number) => {
    return rowHeights[idx];
  };

  const Row = ({ index, style }) => {
    return (
      // <li style={style}>Row {index}
      <li style={style}>
        <Message {...messages[index]} />
      </li>
    )
  };

  if (loading && !messages?.length) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box component="ul" sx={{
      height: `calc(100vh - ${theme.spacing(8)})`,
      position: 'relative',
      insetBlockStart: theme.spacing(8)
    }}>
      <AutoSizer>
        {({ height, width }) => {
          return (
            <List
              height={height}
              itemCount={messages.length - 1}
              itemSize={getItemSize}
              width={width}
            >
              {Row}
            </List>
          )
        }}
      </AutoSizer>
      {pageToken && (
        <Button
          onClick={() => fetchData(pageToken)}
          variant="contained"
        >
          Load More
        </Button>
      )}
    </Box>
  );
};

export default MessageList;