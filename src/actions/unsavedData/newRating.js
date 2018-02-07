import {
  modalMovieData,
  contextualFriends
} from '../_testData.js';

import { hasItem } from '../../util/helpers';

// action types
export const CLEAR_NEW_MOVIE = 'CLEAR_NEW_MOVIE';
export const CHANGE_NEW_MOVIE = 'CHANGE_NEW_MOVIE';
export const UPDATE_NEW_MOVIE_RATING = 'UPDATE_NEW_MOVIE_RATING';
export const UPDATE_NEW_MOVIE_REMARKS = 'UPDATE_NEW_MOVIE_REMARKS';
export const ADD_TAG_FRIEND = 'ADD_TAG_FRIEND';
export const REMOVE_TAG_FRIEND = 'REMOVE_TAG_FRIEND';
export const ADD_AND_TAG_CONTEXTUAL_FRIEND = 'ADD_AND_TAG_CONTEXTUAL_FRIEND';

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

function addAndTagContextualFriendAction(friend) {
  return (dispatch, getState) => {
    const { selectedMovieId } = getState().new.rating;

    dispatch({
      type: ADD_AND_TAG_CONTEXTUAL_FRIEND,
      payload: {
        movieId: selectedMovieId,
        friend,
      },
    });
  };
}

function addFriendToTagActions(friendKey) {
  return (dispatch, getState) => {
    const { selectedMovieId, data } = getState().new.rating;
    const { taggedFriends } = data[selectedMovieId] || {};

    if (hasItem(taggedFriends, friendKey)) return;

    dispatch({
      type: ADD_TAG_FRIEND,
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
      type: REMOVE_TAG_FRIEND,
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

export function addFriendToTag(dispatch, friendKey) {
  dispatch(addFriendToTagActions(friendKey));
}

export function removeFriendToTag(dispatch, friendKey) {
  dispatch(removeFriendToTagActions(friendKey));
}

export function addAndTagContextualFriend(dispatch, friend) {
  dispatch(addAndTagContextualFriendAction(friend));
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
