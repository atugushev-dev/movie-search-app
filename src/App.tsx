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
  Genre: string;
  Year: string;
  imdbRating: string;
}

const App: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async () => {
    const baseUrl = 'https://www.omdbapi.com/';
    const apiKey = '26d161e9';
    const searchUrl = `${baseUrl}?apikey=${apiKey}&s=${search}&type=movie&page=1`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    const topTenMovies = data.Search.slice(0, 10);
    const detailedMoviesPromises = topTenMovies.map(async (movie: any) => {
      const detailsUrl = `${baseUrl}?apikey=${apiKey}&i=${movie.imdbID}`;
      const detailsResponse = await fetch(detailsUrl);
      const movieDetails = await detailsResponse.json();
      return movieDetails;
    });

    const detailedMovies = await Promise.all(detailedMoviesPromises);
    setMovies(detailedMovies);
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
            onKeyPress={handleKeyPress}
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
              <Box key={movie.imdbID} sx={{ marginBottom: 1 }}>
                <Link
                  href={`https://www.imdb.com/title/${movie.imdbID}/`}
                  target="_blank"
                >
                  {movie.Title}
                </Link>
                <Typography variant="body2" component="span" sx={{ marginLeft: 1 }}>
                  ({movie.Year}) - {movie.Genre} - IMDb Rating: {movie.imdbRating}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default App;