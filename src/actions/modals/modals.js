import { ADD_MOVIE_MODAL } from '../../util/constants.js';
import { addNewMovieAction } from './newRating.js';
import { modalMovieData } from '../_testData.js';

// action types
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

// action creators
function openModalAction(modalName, data = {}) {
  return {
    type: OPEN_MODAL,
    payload: {
      modalName,
      data
    }
  };
}

const closeModalAction = { type: CLOSE_MODAL };

// action dispatchers
export function openModal(dispatch, modalName, data) {
  // TODO: better way to do this?
  if (modalName === ADD_MOVIE_MODAL) {
    // TODO: get full movie data
    dispatch(addNewMovieAction(modalMovieData[data.movie.id]));
  }

  dispatch(openModalAction(modalName, data));
}

export function closeModal(dispatch) {
  dispatch(closeModalAction);
}
