import { modalNames } from '../util/constants';
import {
  contextualFriends,
  calloutContext,
  calloutConversation,
} from './_testData';

import { addNewMovieAction } from './unsavedData/newRating';
import { getConversationAction } from './conversations';

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
  if (modalName === modalNames.ADD_MOVIE_MODAL && data && data.movieId) {
    // TODO: get full movie data, including contextual friends
    dispatch(addNewMovieAction(
      data.movieId,
      contextualFriends,
    ));
  }

  if (modalName === modalNames.CALLOUT_MODAL && data && data.calloutId) {
    dispatch(getConversationAction(
      calloutContext,
      calloutConversation,
    ));
  }

  dispatch(openModalAction(modalName, data));
}

export function closeModal(dispatch) {
  dispatch(closeModalAction);
}
