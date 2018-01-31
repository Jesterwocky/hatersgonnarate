import {
  CLEAR_NEW_MOVIE,
  CHANGE_NEW_MOVIE,
  UPDATE_NEW_MOVIE_RATING,
  UPDATE_NEW_MOVIE_REMARKS
} from '../../actions/modals/newRating.js';

const initialState = {
  movie: {
    id: '',
    title: '',
    friends: {
      sawIt: [],
      interested: []
    }
  },
  rating: '',
  remarks: '',
  taggedFriends: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NEW_MOVIE_RATING:
      return {
        ...state,
        rating: action.payload.rating
      };

    case UPDATE_NEW_MOVIE_REMARKS:
      return {
        ...state,
        remarks: action.payload.remarks
      };

    case CHANGE_NEW_MOVIE:
      return {
        ...initialState,
        movie: {
          ...initialState.movie,
          ...action.payload.movie
        }
      };

    case CLEAR_NEW_MOVIE:
      return initialState;
    default:
      return state;
  }
}

export default reducer;
