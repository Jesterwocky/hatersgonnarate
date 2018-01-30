import {
  movies as testMovies,
  matchingMoviesList
} from './_testData.js';

// action types
export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIE = 'GET_MOVIE';
export const GET_MOVIES_MATCHING_SEARCH = 'GET_MOVIES_MATCHING_SEARCH';

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
