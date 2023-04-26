import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Link,
  Box,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Movie } from './App';

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isFavorite,
  onToggleFavorite,
}) => (
  <Card sx={{ minWidth: 200 }}>
    <CardMedia
      component="img"
      height="200"
      image={movie.Poster}
      alt={movie.Title}
    />
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link
          href={`https://www.imdb.com/title/${movie.imdbID}/`}
          target="_blank"
        >
          {movie.Title}
        </Link>
        <IconButton onClick={onToggleFavorite} color="primary">
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
      <Typography variant="body2" component="div">
        ({movie.Year}) - {movie.Genre} - IMDb Rating: {movie.imdbRating}
      </Typography>
    </CardContent>
  </Card>
);

export default MovieCard;