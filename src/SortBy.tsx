import React from 'react';
import { Select, MenuItem, InputLabel, Box } from '@mui/material';

interface SortByProps {
  sort: string;
  onSortChange: (value: string) => void;
}

const SortBy: React.FC<SortByProps> = ({ sort, onSortChange }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <InputLabel id="sort-label">Sort by:</InputLabel>
    <Select
      labelId="sort-label"
      value={sort}
      onChange={(e) =>
        onSortChange((e.target.value as string) || '')
      }
      sx={{ marginLeft: 1 }}
    >
      <MenuItem value="">None</MenuItem>
      <MenuItem value="yearAsc">Year (Ascending)</MenuItem>
      <MenuItem value="yearDesc">Year (Descending)</MenuItem>
      <MenuItem value="ratingAsc">Rating (Ascending)</MenuItem>
      <MenuItem value="ratingDesc">Rating (Descending)</MenuItem>
    </Select>
  </Box>
);

export default SortBy;