import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from '@mui/material';

interface Movie {
  Title: string;
  imdbID: string;
}

const App: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async () => {
    const baseUrl = 'https://www.omdbapi.com/';
    const apiKey = '26d161e9'; // Updated API key
    const queryUrl = `${baseUrl}?apikey=${apiKey}&s=${search}&type=movie&page=1`;

    const response = await fetch(queryUrl);
    const data = await response.json();
    const topTenMovies = data.Search.slice(0, 10);
    setMovies(topTenMovies);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 5,
        }}
      >
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
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress} // Added key press event handler
            label="Search for a movie"
            variant="outlined"
            fullWidth
            sx={{ marginRight: 1 }}
          />
          <Button onClick={handleSearch} variant="contained">
            GO
          </Button>
        </Box>
        {movies.length > 0 && (
          <Box>
            <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
              Search Results:
            </Typography>
            {movies.map((movie) => (
              <Box key={movie.imdbID}>
                <Link
                  href={`https://www.imdb.com/title/${movie.imdbID}/`}
                  target="_blank"
                >
                  {movie.Title}
                </Link>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default App;