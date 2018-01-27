import { movies as testMovies } from './_testData.js';

// action types
export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIE = 'GET_MOVIE';
export const UPDATE_MOVIE_RATING = 'UPDATE_MOVIE_RATING';

// action creators
function createGetMoviesAction(movies) {
  return {
    type: GET_MOVIES,
    payload: {
      movies
    }
  };
}

function createGetMovieAction(movie) {
  return {
    type: GET_MOVIE,
    payload: {
      movie
    }
  };
}

function createUpdateMovieRatingAction(movieId, rating) {
  return {
    type: UPDATE_MOVIE_RATING,
    payload: {
      movieId,
      rating
    }
  };
}

// action dispatchers
export function getMovies(dispatch) {
  dispatch(createGetMoviesAction(testMovies));
}

export function getMovie(dispatch, id) {
  dispatch(createGetMovieAction(testMovies[id]));
}

export function updateMovieRating(dispatch, id, rating) {
  dispatch(createUpdateMovieRatingAction(id, rating));
}
