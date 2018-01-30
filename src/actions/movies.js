import {
  movies as testMovies,
  matchingMoviesList
} from './_testData.js';

// action types
export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIE = 'GET_MOVIE';
export const GET_MOVIES_MATCHING_SEARCH = 'GET_MOVIES_MATCHING_SEARCH';
export const UPDATE_MOVIE_RATING = 'UPDATE_MOVIE_RATING';

// action creators
function getMoviesAction(movies) {
  return {
    type: GET_MOVIES,
    payload: {
      movies
    }
  };
}

function getMovieAction(movie) {
  return {
    type: GET_MOVIE,
    payload: {
      movie
    }
  };
}

function getMatchingMovies(searchMatches) {
  return {
    type: GET_MOVIES_MATCHING_SEARCH,
    payload: {
      searchMatches
    }
  };
}

function updateMovieRatingAction(movieId, rating, remarks) {
  return {
    type: UPDATE_MOVIE_RATING,
    payload: {
      movieId,
      rating,
      remarks
    }
  };
}

// action dispatchers
export function getMovies(dispatch) {
  dispatch(getMoviesAction(testMovies));
}

export function getMovie(dispatch, id) {
  dispatch(getMovieAction(testMovies[id]));
}

export function findMatchingMovies(dispatch, movieString) {
  dispatch(getMatchingMovies(matchingMoviesList));
}

export function updateMovieRating(dispatch, id, rating, remarks) {
  dispatch(updateMovieRatingAction(id, rating, remarks));
}
