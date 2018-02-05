import {
  modalMovieData,
  friends as taggableFriends
} from '../_testData.js';

import hasItem from '../../util/helpers.js';

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
      rating,
    },
  };
}

function updateNewMovieRemarksAction(remarks) {
  return {
    type: UPDATE_NEW_MOVIE_REMARKS,
    payload: {
      remarks,
    },
  };
}

function addFriendToTagActions(friendKey) {
  return {
    type: ADD_FRIEND_TO_TAG,
    payload: {
      friendKey,
    },
  };
}

function removeFriendToTagActions(friendKey) {
  return {
    type: REMOVE_FRIEND_TO_TAG,
    payload: {
      friendKey,
    },
  };
}

export function addNewMovieAction(movie, friends) {
  return {
    type: CHANGE_NEW_MOVIE,
    payload: {
      movie,
      friends: taggableFriends,
    },
  };
}

const clearNewRatingAction = {
  type: CLEAR_NEW_MOVIE,
};

// action dispatchers
export function updateNewMovieRating(dispatch, rating) {
  dispatch(updateNewMovieRatingAction(rating));
}

export function updateNewMovieRemarks(dispatch, remarks) {
  dispatch(updateNewMovieRemarksAction(remarks));
}

// export function toggleFriendSelection(dispatch, friendKey) {
//   return (getState) => {
//     const currentState = getState();
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
  dispatch(clearNewRatingAction);
}

export function addNewMovie(dispatch, movie, friends) {
  dispatch(addNewMovieAction(
    modalMovieData[movie.id],
    taggableFriends,
  ));
}
