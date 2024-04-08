import { Box, Card, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { memo } from 'react';

import Avatar from './Avatar';

interface Message {
  author: Author;
  content: string;
  id: string;
  realId?: string;
  updated: string;
}

const Message = memo(({
  author,
  content,
  id,
  updated,
}: Message) => {
  const theme = useTheme();
  return (
    <Card
      id={id}
      sx={{
        padding: theme.spacing(2)
      }}
    >
      <Box sx={{ display: 'flex '}}>
        <Avatar
          name={author.name}
          photoUrl={author.photoUrl}
        />
        <Box sx={{ marginInlineStart: theme.spacing(2) }}>
          <Typography>{author.name}</Typography>
          <Typography>{dayjs(updated).fromNow()}</Typography>
        </Box>
      </Box>
      <Typography sx={{ marginBlockStart: theme.spacing(2) }}>
        {content}
      </Typography>
    </Card>
  );
});

export default Message;