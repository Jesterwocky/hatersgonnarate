import {
  CLEAR_NEW_MOVIE,
  ADD_NEW_MOVIE_TO_RATE,
  UPDATE_NEW_MOVIE_RATING,
  UPDATE_NEW_MOVIE_REMARKS,
  ADD_TAG_FRIEND,
  REMOVE_TAG_FRIEND,
  ADD_AND_TAG_CONTEXTUAL_FRIEND,
  USE_PREVIOUS_RATING,
  CLEAR_PREVIOUS_RATING,
} from '../../actions/unsavedData/newRating';

const initialMovieState = {
  rating: null,
  remarks: '',

  // friends who saw it, friends who are interested, and friends
  // who the user has explicitly searched
  contextualFriends: [],

  taggedFriends: [],
  previousNewRating: {},
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

    case USE_PREVIOUS_RATING: {
      return {
        ...state,
        ...state.previousNewRating,
        previousNewRating: {},
      };
    }

    case CLEAR_PREVIOUS_RATING: {
      return {
        ...state,
        previousNewRating: {},
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
    case USE_PREVIOUS_RATING:
    case CLEAR_PREVIOUS_RATING:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.movieId]: movieRatingReducer(
            state.data[action.payload.movieId],
            action,
          ),
        },
      };

    case ADD_NEW_MOVIE_TO_RATE:
      return {
        ...state,
        selectedMovieId: action.payload.movieId,
        data: {
          ...state.data,

          // create clear record. If data exists for movie,
          // save it under previousNewRating
          [action.payload.movieId]: {
            ...initialMovieState,
            contextualFriends: action.payload.contextualFriends,
            previousNewRating: {
              ...state.data[action.payload.movieId],
            },
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
