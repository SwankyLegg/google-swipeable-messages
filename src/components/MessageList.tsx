import React, { useCallback, useEffect, useState } from 'react';
import Message from './Message';
import { Box, Button, useTheme } from '@mui/material';

const MessageList: React.FC = () => {
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

      setPageToken(data.pageToken);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [pageToken]);

  const handleScroll = useCallback((evt) => {
    console.info(evt.target);
    const { clientHeight, scrollHeight, scrollTop } = evt.target;
    const pct = scrollTop / (scrollHeight - clientHeight) * 100
    if (pct > 80) {
      fetchData(pageToken);
    }
  }, [fetchData, pageToken]);

  // First load
  useEffect(() => {
    fetchData(null);
  }, []);

  if (loading && !messages?.length) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box
      component="ul"
      id="MessageList"
      onScroll={handleScroll}
      sx={{
        height: `calc(100vh - ${theme.spacing(8)})`,
        position: 'relative',
        insetBlockStart: theme.spacing(8),
        overflowY: 'auto',
    }}>
      {/* <AutoSizer>
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
      </AutoSizer> */}
      {messages.map((msg, idx) => (
        <Message {...msg} key={`${msg.id}-${idx}`}/>
      ))}
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