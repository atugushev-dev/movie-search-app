import React, { forwardRef } from 'react';
import { TextField, Button, Box, InputAdornment, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface MovieSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
  onButtonClick: () => void;
  onClear: () => void;
}

const MovieSearch = forwardRef<HTMLInputElement, MovieSearchProps>(
  ({ search, onSearchChange, onKeyPress, onButtonClick, onClear }, ref) => (
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onClear} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        inputRef={ref} // Add ref to the input element
      />
      <Button onClick={onButtonClick} variant="contained">
        GO
      </Button>
    </Box>
  )
);

export default MovieSearch;