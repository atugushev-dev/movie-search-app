import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Select,
  MenuItem,
  InputLabel,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface Movie {
  Title: string;
  imdbID: string;
  Genre: string;
  Year: string;
  imdbRating: string;
  Poster: string;
}

const App: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sort, setSort] = useState<string>('');
  const resultCount = 6;

  const handleSearch = async () => {
    const baseUrl = 'https://www.omdbapi.com/';
    const apiKey = '26d161e9';
    const searchUrl = `${baseUrl}?apikey=${apiKey}&s=${search}&type=movie&page=1`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    const topMovies = data.Search.slice(0, resultCount);
    const detailedMoviesPromises = topMovies.map(async (movie: any) => {
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

  const handleSort = (event: SelectChangeEvent<string>) => {
    setSort(event.target.value as string);

    const sortedMovies = [...movies].sort((a, b) => {
      switch (event.target.value) {
        case 'yearAsc':
          return parseInt(a.Year) - parseInt(b.Year);
        case 'yearDesc':
          return parseInt(b.Year) - parseInt(a.Year);
        case 'ratingAsc':
          return parseFloat(a.imdbRating) - parseFloat(b.imdbRating);
        case 'ratingDesc':
          return parseFloat(b.imdbRating) - parseFloat(a.imdbRating);
        default:
          return 0;
      }
    });

    setMovies(sortedMovies);
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InputLabel id="sort-label">Sort by:</InputLabel>
                <Select
                  labelId="sort-label"
                  value={sort}
                  onChange={handleSort}
                  sx={{ marginLeft: 1 }}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="yearAsc">Year (Ascending)</MenuItem>
                  <MenuItem value="yearDesc">Year (Descending)</MenuItem>
                  <MenuItem value="ratingAsc">Rating (Ascending)</MenuItem>
                  <MenuItem value="ratingDesc">Rating (Descending)</MenuItem>
                </Select>
              </Box>
            </Box>
            <Grid container spacing={2}>
              {movies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
                  <Card sx={{ minWidth: 200 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={movie.Poster}
                      alt={movie.Title}
                    />
                    <CardContent>
                      <Link
                        href={`https://www.imdb.com/title/${movie.imdbID}/`}
                        target="_blank"
                      >
                        {movie.Title}
                      </Link>
                      <Typography variant="body2" component="div">
                        ({movie.Year}) - {movie.Genre} - IMDb Rating: {movie.imdbRating}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default App;
