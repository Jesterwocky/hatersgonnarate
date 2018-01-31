import { modalMovieData } from '../_testData.js';

// action types
export const CLEAR_NEW_MOVIE = 'CLEAR_NEW_MOVIE';
export const CHANGE_NEW_MOVIE = 'CHANGE_NEW_MOVIE';
export const UPDATE_NEW_MOVIE_RATING = 'UPDATE_NEW_MOVIE_RATING';
export const UPDATE_NEW_MOVIE_REMARKS = 'UPDATE_NEW_MOVIE_REMARKS';
export const ADD_FRIEND_TO_TAG = 'ADD_FRIEND_TO_TAG';
export const REMOVE_FRIEND_TO_TAG = 'REMOVE_FRIEND_TO_TAG';

// action creators
function updateNewMovieRatingAction(rating) {
  return {
    type: UPDATE_NEW_MOVIE_RATING,
    payload: {
      rating
    }
  };
}

function updateNewMovieRemarksAction(remarks) {
  return {
    type: UPDATE_NEW_MOVIE_REMARKS,
    payload: {
      remarks
    }
  };
}

function addFriendToTagActions(friend) {
  return {
    type: ADD_FRIEND_TO_TAG,
    payload: {
      friend
    }
  };
}

function removeFriendToTagActions(friend) {
  return {
    type: REMOVE_FRIEND_TO_TAG,
    payload: {
      friend
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

export function addFriendToTag(dispatch, friend) {
  dispatch(addFriendToTagActions(friend));
}

export function removeFriendToTag(dispatch, friend) {
  dispatch(removeFriendToTagActions(friend));
}

export function clearNewRating(dispatch) {
  dispatch(clearNewRatingAction);
}

export function addNewMovie(dispatch, movie) {
  dispatch(addNewMovieAction(modalMovieData[movie.id]));
}
