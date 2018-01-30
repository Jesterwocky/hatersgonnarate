import { movies as testMovies, reRateMovieData } from './_testData.js';

// action types
export const CLEAR_NEW_RATING = 'CLEAR_NEW_RATING';
export const UPDATE_NEW_RATING = 'UPDATE_NEW_RATING';

// action creators
function updateNewRatingAction(rating) {
  return {
    type: UPDATE_NEW_RATING,
    payload: {
      rating
    }
  };
}

const clearNewRatingAction = {
  type: CLEAR_NEW_RATING
};

// action dispatchers
export function updateNewRating(dispatch, { rating, remarks, taggedFriends }) {
  dispatch(updateNewRatingAction({ rating, remarks, taggedFriends }));
}

export function clearNewRating(dispatch) {
  dispatch(clearNewRatingAction);
}
