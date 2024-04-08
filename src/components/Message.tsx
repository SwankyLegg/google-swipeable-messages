import { Avatar, Box, Card, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';

interface Author {
  name: string;
  photoUrl: string;
}

interface Message {
  author: Author;
  content: string;
  id: string;
  updated: string;
}

const Message = ({
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
        marginBlockStart: theme.spacing(2),
        padding: theme.spacing(2)
      }}
    >
      <Box sx={{ display: 'flex '}}>
        <Avatar
          alt={author.name}
          src={author.photoUrl}
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
};

export default Message;