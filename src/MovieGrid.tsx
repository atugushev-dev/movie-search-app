import React from 'react';
import { Grid } from '@mui/material';
import MovieCard from './MovieCard';
import { Movie } from './App';

interface MovieGridProps {
  movies: Movie[];
  favorites: { [key: string]: boolean };
  onToggleFavorite: (movieId: string) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, favorites, onToggleFavorite }) => (
  <Grid container spacing={2}>
    {movies.map((movie) => (
      <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
        <MovieCard
          movie={movie}
          isFavorite={favorites[movie.imdbID]}
          onToggleFavorite={() => onToggleFavorite(movie.imdbID)}
        />
      </Grid>
    ))}
  </Grid>
);

export default MovieGrid;