import {
  CLEAR_NEW_MOVIE,
  CHANGE_NEW_MOVIE,
  UPDATE_NEW_MOVIE_RATING,
  UPDATE_NEW_MOVIE_REMARKS,
  ADD_FRIEND_TO_TAG,
  REMOVE_FRIEND_TO_TAG
} from '../../actions/modals/newRating.js';

const initialState = {
  movie: {
    id: '',
    title: '',
    blurb: '',
    friends: {
      sawIt: [],
      interested: []
    }
  },
  rating: null,
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

    case ADD_FRIEND_TO_TAG:
      return {
        ...state,
        taggedFriends: state.taggedFriends.concat(action.payload.friend)
      };

    case REMOVE_FRIEND_TO_TAG:
      return {
        ...state,
        taggedFriends: state.taggedFriends
          .filter(friend => friend.id !== action.payload.friend.id)
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
