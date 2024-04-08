import { Avatar as MuiAvatar } from '@mui/material';
import { memo } from 'react';

import endpoint from '../utils/endpoint';

interface AvatarProps {
  name: string,
  photoUrl: string
}

const Avatar: React.FC<AvatarProps> = memo(({
  name,
  photoUrl
}) => {
  return (
    <MuiAvatar
      alt={name}
      src={`${endpoint}${photoUrl}`}
      sx={{
        backgroundColor: '#BDBDBD'
      }}
    />
  );
});

export default Avatar;