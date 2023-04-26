import React from 'react';
import { TextField, Button, Box } from '@mui/material';

interface MovieSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
  onButtonClick: () => void;
}

const MovieSearch: React.FC<MovieSearchProps> = ({
  search,
  onSearchChange,
  onKeyPress,
  onButtonClick,
}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    }}
  >
    <TextField
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      onKeyPress={onKeyPress}
      label="Search for a movie"
      variant="outlined"
      fullWidth
      sx={{ marginRight: 1 }}
    />
    <Button onClick={onButtonClick} variant="contained">
      GO
    </Button>
  </Box>
);

export default MovieSearch;