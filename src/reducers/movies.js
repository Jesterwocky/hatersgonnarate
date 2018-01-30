import {
  GET_MOVIES,
  GET_MOVIE,
  UPDATE_MOVIE_RATING,
  GET_MOVIES_MATCHING_SEARCH
} from '../actions/movies.js';

const initialState = {
  movies: {},
  searchMatches: [],
  newRating: {
    movie: {
      id: '',
      name: '',
      friends: {
        sawIt: [],
        interested: []
      }
    },
    rating: '',
    remarks: '',
    taggedFriends: []
  },
  currentMovie: {}
};

function getMovieWithUpdatedRating(movies, movieId, { rating, remarks, taggedFriends }) {
  const movie = (movies || {})[movieId] || {};
  const ratingAsString = rating.toString();

  return {
    [movieId]: {
      ...movie,
      ratings: {
        ...movie.ratings,
        user: ratingAsString,
        userRemarks: remarks,
        taggedFriends
      }
    }
  };
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      // for now, just concat movies
      return {
        ...state,
        movies: {
          ...state.movies,
          ...action.payload.movies
        }
      };
    case GET_MOVIE:
      return {
        ...state,
        currentMovie: action.payload.movie
      };
    case UPDATE_MOVIE_RATING:
      return {
        ...state,
        movies: {
          ...state.movies,
          ...getMovieWithUpdatedRating(
            state.movies,
            action.payload.movieId,
            {
              rating: action.payload.rating,
              remarks: action.payload.remarks,
              taggedFriends: action.payload.taggedFriends
            }
          )
        }
      };
    case GET_MOVIES_MATCHING_SEARCH:
      return {
        ...state,
        searchMatches: action.payload.searchMatches
      };
    default:
      return state;
  }
}

export default reducer;
