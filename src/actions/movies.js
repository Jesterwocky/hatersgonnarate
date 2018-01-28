import { movies as testMovies, reRateMovieData } from './_testData.js';

// action types
export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIE = 'GET_MOVIE';
export const UPDATE_MOVIE_RATING = 'UPDATE_MOVIE_RATING';
export const START_RERATE = 'START_RERATE';
export const UPDATE_RERATE = 'UPDATE_RERATE';

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

function createStartReRateAction(data) {
  return {
    type: START_RERATE,
    payload: {
      data
    }
  };
}

function createUpdateReRateAction(data) {
  return {
    type: UPDATE_RERATE,
    payload: {
      data
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

export function startReRate(dispatch, data) {
  dispatch(createStartReRateAction(reRateMovieData));
}

export function updateReRate(dispatch, data) {
  dispatch(createUpdateReRateAction(data));
}
