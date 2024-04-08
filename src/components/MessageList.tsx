import { Box, Button, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import endpoint from '../utils/endpoint';
import Message from './Message';
import SwipeableCard from './SwipeableCard';

const MessageList: React.FC = () => {
  const theme = useTheme();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>();
  const [pageToken, setPageToken] = useState<string | null>();
  const [fetchLimit, setFetchLimit] = useState(25);

  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const fetchData = useCallback(async (pageToken: string | null = null) => {
    setLoading(true);

    let url = `${endpoint}/messages?limit=${fetchLimit}`;
    if (pageToken) {
      url += `&pageToken=${pageToken}`;
      setFetchLimit(50);
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: MessagesResponse = await response.json();
      const newMessages = data.messages.map((msg, idx) => {
        msg.realId = `${msg.id}-${idx}`;
        return msg;
      });
      if (messages?.length > 0) {
        setMessages([...messages, ...newMessages]);
      } else if (data.messages) {
        setMessages(newMessages);
      }

      setPageToken(data.pageToken);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [fetchLimit, messages]);

  const moveUpMs = 500;
  const handleSwipeAway = (index) => {
    const height = refs.current[index]?.offsetHeight || 0;

    // Update styles to transition remaining messages up
    refs.current.slice(index + 1, index + 6).forEach((el) => {
      if (!el) return;
      el.style.transform = `translate3d(0,-${height}px,0)`;
    });

    refs.current[index].style.opacity = '0';
    refs.current[index].ontransitionend = () => {
      // Remove the ref of the swiped away message
      refs.current.splice(index, 1);
      setMessages(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleScroll = (evt) => {
    const { clientHeight, scrollHeight, scrollTop } = evt.target;
    const pct = scrollTop / (scrollHeight - clientHeight) * 100
    if (pct > 75) {
      fetchData(pageToken);
    }
  };

  // First load
  useEffect(() => {
    fetchData(null);
  }, []);

  useLayoutEffect(() => {
    refs.current.forEach((el) => {
      if (!el?.style) return;
      el.style.transform = `translate3d(0,0,0)`;
    });
  }, [messages]);

  if (loading && !messages?.length) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box
      component="ul"
      id="MessageList"
      onScroll={handleScroll}
      sx={{
        backgroundColor: '#EEEEEE',
        height: `calc(100vh - ${theme.spacing(8)})`,
        paddingInline: theme.spacing(2),
        position: 'relative',
          insetBlockStart: theme.spacing(8),
        overflowX: 'visible',
        overflowY: 'auto',
    }}>
      {messages.map((msg, idx) => (
        <div
          key={`${msg.realId}-${idx}`}
          ref={el => refs.current[idx] = el}
          style={{
            paddingBlockStart: theme.spacing(2),
            transition: `opacity ${moveUpMs}ms ease, transform ${moveUpMs}ms ease`
          }}
        >
          <SwipeableCard
            realId={msg.realId}
            onSwipeAway={() => handleSwipeAway(idx)}
          >
            <Message {...msg} />
          </SwipeableCard>
        </div>
      ))}
      {(pageToken || messages.length < fetchLimit) && (
        <Button
          onClick={() => fetchData(pageToken)}
          sx={{ margin: '0 auto' }}
          variant="contained"
        >
          Load More
        </Button>
      )}
    </Box>
  );
};

export default MessageList;