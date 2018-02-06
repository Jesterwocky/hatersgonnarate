import { ADD_MOVIE_MODAL } from '../util/constants';
import { contextualFriends } from './_testData';

import { addNewMovieAction } from './unsavedData/newRating';
import { addContextualFriends } from './friends';

// action types
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

// action creators
function openModalAction(modalName, data = {}) {
  return {
    type: OPEN_MODAL,
    payload: {
      modalName,
      data,
    },
  };
}

const closeModalAction = { type: CLOSE_MODAL };

// action dispatchers
export function openModal(dispatch, modalName, data) {
  // TODO: better way to do this?
  if (modalName === ADD_MOVIE_MODAL) {
    // TODO: get full movie data, including contextual friends
    dispatch(addNewMovieAction(
      data.movieId,
      contextualFriends,
    ));
  }

  dispatch(openModalAction(modalName, data));
}

export function closeModal(dispatch) {
  dispatch(closeModalAction);
}
