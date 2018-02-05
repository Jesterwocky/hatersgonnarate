import {
  CLEAR_NEW_MOVIE,
  CHANGE_NEW_MOVIE,
  UPDATE_NEW_MOVIE_RATING,
  UPDATE_NEW_MOVIE_REMARKS,
  ADD_FRIEND_TO_TAG,
  REMOVE_FRIEND_TO_TAG,
} from '../../actions/modals/newRating.js';

const initialState = {
  movie: {
    id: '',
    title: '',
    blurb: '',
    friends: {
      sawIt: [],
      interested: [],
    },
  },
  rating: null,
  remarks: '',
  taggedFriends: [],
  friends: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NEW_MOVIE_RATING:
      return {
        ...state,
        rating: action.payload.rating,
      };

    case UPDATE_NEW_MOVIE_REMARKS:
      return {
        ...state,
        remarks: action.payload.remarks,
      };

    case ADD_FRIEND_TO_TAG:
      return {
        ...state,
        taggedFriends: state.taggedFriends.concat([action.payload.friendKey]),
      };

    case REMOVE_FRIEND_TO_TAG:
      return {
        ...state,
        taggedFriends: state.taggedFriends
          .slice(0, state.taggedFriends.indexOf(action.payload.friendKey))
          .concat(state.taggedFriends
            .slice(state.taggedFriends.indexOf(action.payload.friendKey) + 1)),
      };

    case CHANGE_NEW_MOVIE:
      return {
        ...initialState,
        movie: {
          ...initialState.movie,
          ...action.payload.movie,
        },
        friends: action.payload.friends,
      };

    case CLEAR_NEW_MOVIE:
      return initialState;
    default:
      return state;
  }
}

export default reducer;
