import {
  UPDATE_NEW_RATING,
  CLEAR_NEW_RATING
} from '../actions/movies.js';

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
    case UPDATE_NEW_RATING:
      return {
        ...state,
        newRating: {
          ...state.newRating,
          ...action.payload.data
        }
      };
    case CLEAR_NEW_RATING:
      return {
        ...state,
        newRating: {
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
        }
      };
    default:
      return state;
  }
}

export default reducer;
