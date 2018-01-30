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

function reducer(state = initialState, action) {
  function getMovieWithUpdatedRating(movieId, rating, remarks) {
    const movie = (state.movies || {})[movieId] || {};
    const ratingAsString = rating.toString();

    return {
      [movieId]: {
        ...movie,
        ratings: {
          ...movie.ratings,
          user: ratingAsString,
          userRemarks: remarks
        }
      }
    };
  }

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
            action.payload.movieId,
            action.payload.rating,
            action.payload.remarks,
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
