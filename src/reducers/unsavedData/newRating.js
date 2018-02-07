import {
  CLEAR_NEW_MOVIE,
  CHANGE_NEW_MOVIE,
  UPDATE_NEW_MOVIE_RATING,
  UPDATE_NEW_MOVIE_REMARKS,
  ADD_TAG_FRIEND,
  REMOVE_TAG_FRIEND,
  ADD_AND_TAG_CONTEXTUAL_FRIEND,
} from '../../actions/unsavedData/newRating';

const initialMovieState = {
  rating: null,
  remarks: '',

  // friends who saw it, friends who are interested, and friends
  // who the user has explicitly searched
  contextualFriends: [],

  taggedFriends: [],
  startedRatingPreviously: false,
};

// reducer for a single movie rating
function movieRatingReducer(state = initialMovieState, action) {
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

    case ADD_AND_TAG_CONTEXTUAL_FRIEND:
      return {
        ...state,
        contextualFriends: state.contextualFriends.concat([action.payload.friend]),
        taggedFriends: state.taggedFriends.concat([action.payload.friend.id]),
      };

    case ADD_TAG_FRIEND:
      return {
        ...state,
        taggedFriends: state.taggedFriends.concat([action.payload.friendKey]),
      };

    case REMOVE_TAG_FRIEND: {
      const indexOfFriend = state.taggedFriends.indexOf(action.payload.friendKey);
      return {
        ...state,
        taggedFriends: state.taggedFriends.slice(0, indexOfFriend)
          .concat(state.taggedFriends.slice(indexOfFriend + 1)),
      };
    }

    default:
      return state;
  }
}

const initialState = {
  selectedMovieId: '',
  data: {}, // each movie user has started rating, under key of movieId
};

// reducer for all new rating data
function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NEW_MOVIE_RATING:
    case UPDATE_NEW_MOVIE_REMARKS:
    case ADD_AND_TAG_CONTEXTUAL_FRIEND:
    case ADD_TAG_FRIEND:
    case REMOVE_TAG_FRIEND:
      return {
        ...state,
        data: {
          [action.payload.movieId]: movieRatingReducer(
            state.data[action.payload.movieId],
            action,
          ),
        },
      };

    case CHANGE_NEW_MOVIE:
      return {
        ...state,
        selectedMovieId: action.payload.movieId,
        data: {
          ...state.data,
          [action.payload.movieId]: {
            ...initialMovieState,
            contextualFriends: action.payload.friends,

            // in case user started rating before, move existing rating
            // data under previousNewRating and allow user to choose whether
            // to use existing rating or new rating data (similar to Trello)
            previousNewRating: state[action.payload.movieId] || {},
          },
        },
      };

    case CLEAR_NEW_MOVIE: {
      const {
        [action.payload.movieId]: keyToDelete,
        ...dataMinusMovie
      } = state.data;

      delete dataMinusMovie[action.payload.movieId];
      return {
        ...state,
        data: dataMinusMovie,
      };
    }
    default:
      return state;
  }
}

export default reducer;
