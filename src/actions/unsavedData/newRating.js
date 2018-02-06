import {
  modalMovieData,
  contextualFriends
} from '../_testData.js';

// action types
export const CLEAR_NEW_MOVIE = 'CLEAR_NEW_MOVIE';
export const CHANGE_NEW_MOVIE = 'CHANGE_NEW_MOVIE';
export const UPDATE_NEW_MOVIE_RATING = 'UPDATE_NEW_MOVIE_RATING';
export const UPDATE_NEW_MOVIE_REMARKS = 'UPDATE_NEW_MOVIE_REMARKS';
export const ADD_FRIEND_TO_TAG = 'ADD_FRIEND_TO_TAG';
export const REMOVE_FRIEND_TO_TAG = 'REMOVE_FRIEND_TO_TAG';

// action creators
function updateNewMovieRatingAction(rating) {
  return (dispatch, getState) => {
    const { selectedMovieId } = getState().new.rating;

    dispatch({
      type: UPDATE_NEW_MOVIE_RATING,
      payload: {
        movieId: selectedMovieId,
        rating,
      },
    });
  };
}

function updateNewMovieRemarksAction(remarks) {
  return (dispatch, getState) => {
    const { selectedMovieId } = getState().new.rating;

    dispatch({
      type: UPDATE_NEW_MOVIE_REMARKS,
      payload: {
        movieId: selectedMovieId,
        remarks,
      },
    });
  };
}

function addFriendToTagActions(friendKey) {
  return (dispatch, getState) => {
    const { selectedMovieId } = getState().new.rating;

    dispatch({
      type: ADD_FRIEND_TO_TAG,
      payload: {
        movieId: selectedMovieId,
        friendKey,
      },
    });
  };
}

function removeFriendToTagActions(friendKey) {
  return (dispatch, getState) => {
    const { selectedMovieId } = getState().new.rating;

    dispatch({
      type: REMOVE_FRIEND_TO_TAG,
      payload: {
        movieId: selectedMovieId,
        friendKey,
      },
    });
  };
}

export function addNewMovieAction(movieId, friends) {
  return {
    type: CHANGE_NEW_MOVIE,
    payload: {
      movieId,
      friends,
    },
  };
}

export function clearNewRatingAction() {
  return (dispatch, getState) => {
    const { selectedMovieId } = getState().new.rating;

    dispatch({
      type: CLEAR_NEW_MOVIE,
      payload: {
        movieId: selectedMovieId,
      },
    });
  };
}

// action dispatchers
export function updateNewMovieRating(dispatch, rating) {
  dispatch(updateNewMovieRatingAction(rating));
}

export function updateNewMovieRemarks(dispatch, remarks) {
  dispatch(updateNewMovieRemarksAction(remarks));
}

// export function toggleFriendSelection(dispatch, friendKey) {
//   return (dispatch, getState) => {
//     const currentState = getState().new.rating;
//     if (hasItem(
//       currentState.newRating.taggedFriends,
//       friendKey
//     )) {
//       dispatch(addFriendToTagActions(friendKey));
//     } else {
//       dispatch(removeFriendToTagActions(friendKey));
//     }
//   };
// }

// TODO: use thunks and getState (above) to check for friend in
// tagged list already before dispatching action to add friend
export function addFriendToTag(dispatch, friendKey) {
  dispatch(addFriendToTagActions(friendKey));
}

export function removeFriendToTag(dispatch, friendKey) {
  dispatch(removeFriendToTagActions(friendKey));
}

export function clearNewRating(dispatch) {
  dispatch(clearNewRatingAction());
}

export function addNewMovie(dispatch, movieId, friends) {
  dispatch(addNewMovieAction(
    movieId,
    contextualFriends,
  ));
}
