import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import MovieSearch from './MovieSearch';
import SortBy from './SortBy';
import MovieGrid from './MovieGrid';

export interface Movie {
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
  const [sort, setSort] = useState<string>('ratingDesc');
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultCount = 6;

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    const storedSort = localStorage.getItem('sort');

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    if (storedSort) {
      setSort(storedSort);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    if (query) {
      setSearch(query);
      performSearch(query);
    }
  }, []);

  const performSearch = async (query: string) => {
    const baseUrl = 'https://www.omdbapi.com/';
    const apiKey = '26d161e9';
    const searchUrl = `${baseUrl}?apikey=${apiKey}&s=${query}&type=movie&page=1`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    if (!data.Search || data.Search.length === 0) {
      setMovies([]);
      setSearchPerformed(true);
      return;
    }

    const topMovies = data.Search.slice(0, resultCount);
    const detailedMoviesPromises = topMovies.map(async (movie: any) => {
      const detailsUrl = `${baseUrl}?apikey=${apiKey}&i=${movie.imdbID}`;
      const detailsResponse = await fetch(detailsUrl);
      const movieDetails = await detailsResponse.json();
      return movieDetails;
    });

    const detailedMovies = await Promise.all(detailedMoviesPromises);
    const sortedMovies = sortMovies(detailedMovies, sort);
    setMovies(sortedMovies);
    setSearchPerformed(true);
  };

  const sortMovies = (movies: Movie[], sortValue: string) => {
    return [...movies].sort((a, b) => {
      switch (sortValue) {
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
  };

  const handleSearch = () => {
    window.history.pushState({}, '', `?query=${search}`);
    performSearch(search);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSort = (value: string) => {
    setSort(value);
    localStorage.setItem('sort', value);
    const sortedMovies = sortMovies(movies, value);
    setMovies(sortedMovies);
  };

  const handleToggleFavorite = (movieId: string) => {
    const updatedFavorites = { ...favorites, [movieId]: !favorites[movieId] };
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleClear = () => {
    setSearch('');
    setMovies([]);
    setSearchPerformed(false);
    searchInputRef.current?.focus();
  }

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
        <MovieSearch
          search={search}
          onSearchChange={setSearch}
          onKeyPress={handleKeyPress}
          onButtonClick={handleSearch}
          onClear={handleClear}
          ref={searchInputRef}
        />
        {searchPerformed && (
          movies.length === 0 ? (
            <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
              No movies found.
            </Typography>
          ) : (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                <Typography variant="h6" component="div">
                  Search Results:
                </Typography>
                <SortBy sort={sort} onSortChange={handleSort} />
              </Box>
              <MovieGrid
                movies={movies}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            </Box>
          )
        )}
      </Box>
    </Container>
  );
};

export default App;