import { movies as testMovies, reRateMovieData } from '../_testData.js';

// action types
export const CLEAR_NEW_MOVIE = 'CLEAR_NEW_MOVIE';
export const CHANGE_NEW_MOVIE = 'CHANGE_NEW_MOVIE';
export const UPDATE_NEW_MOVIE_RATING = 'UPDATE_NEW_MOVIE_RATING';
export const UPDATE_NEW_MOVIE_REMARKS = 'UPDATE_NEW_MOVIE_REMARKS';

// action creators
function updateNewMovieRatingAction(rating) {
  return {
    type: UPDATE_NEW_MOVIE_RATING,
    payload: {
      rating
    }
  };
}

function updateNewMovieRemarksAction(rating) {
  return {
    type: UPDATE_NEW_MOVIE_REMARKS,
    payload: {
      rating
    }
  };
}

export function addNewMovieAction(movie) {
  return {
    type: CHANGE_NEW_MOVIE,
    payload: {
      movie
    }
  };
}

const clearNewRatingAction = {
  type: CLEAR_NEW_MOVIE
};

// action dispatchers
export function updateNewMovieRating(dispatch, rating) {
  dispatch(updateNewMovieRatingAction(rating));
}

export function updateNewMovieRemarks(dispatch, remarks) {
  dispatch(updateNewMovieRemarksAction(remarks));
}

export function clearNewRating(dispatch) {
  dispatch(clearNewRatingAction);
}

export function addNewMovie(dispatch, movie) {
  dispatch(addNewMovieAction(movie));
}
