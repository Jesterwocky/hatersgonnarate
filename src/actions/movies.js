import {
  movies as testMovies,
  extraMovies,
  matchingMoviesList,
} from './_testData.js';

// action types
export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIE = 'GET_MOVIE';
export const GET_MOVIES_MATCHING_SEARCH = 'GET_MOVIES_MATCHING_SEARCH';

// TODO: better naming to differentiate putting new rating info in createStore
// vs saving new rating (which UPDATE_MOVIE_RATING does). Or put all the
// newRating stuff in component state. Probably makes more sense
export const UPDATE_MOVIE_RATING = 'UPDATE_MOVIE_RATING';
export const ADD_MOVIE_RATING = 'ADD_MOVIE_RATING';

// action creators
function getMoviesAction(movies) {
  return {
    type: GET_MOVIES,
    payload: {
      movies,
    },
  };
}

function getMovieAction(movie) {
  return {
    type: GET_MOVIE,
    payload: {
      movie,
    },
  };
}

function getMatchingMoviesAction(searchMatches) {
  return {
    type: GET_MOVIES_MATCHING_SEARCH,
    payload: {
      searchMatches,
    },
  };
}

function updateMovieRatingAction(movieId, rating, remarks) {
  return {
    type: UPDATE_MOVIE_RATING,
    payload: {
      movieId,
      rating,
      remarks,
    },
  };
}

function addMovieRatingAction(movie) {
  return {
    type: ADD_MOVIE_RATING,
    payload: {
      movie,
    },
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
  dispatch(getMatchingMoviesAction(matchingMoviesList));
}

// TODO: make this an object (number of params keeps growing)
export function updateMovieRating(dispatch, id, rating, remarks) {
  dispatch(updateMovieRatingAction(id, rating, remarks));
}

export function addMovieRating(dispatch, id, rating, remarks, taggedFriends) {
  // TODO: save movie rating and ALSO get/return recently rated movies
  // (including this one)
  dispatch(addMovieRatingAction({
    ...extraMovies[id],
    ratings: {
      ...extraMovies[id].ratings,
      user: rating.toString(),
    },
    remarks,
    taggedFriends,
  }));
}
