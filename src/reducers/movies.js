import {
  GET_MOVIES,
  GET_MOVIE,
  ADD_MOVIE_RATING,
  UPDATE_MOVIE_RATING,
  GET_MOVIES_MATCHING_SEARCH,
} from '../actions/movies';

const initialState = {
  // TODO: differentiate rated vs unrated movies ?
  movies: {},
  searchMatches: [],
  currentMovie: {},
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
          userRemarks: remarks,
        },
      },
    };
  }

  switch (action.type) {
    case GET_MOVIES:
      // for now, just concat movies
      return {
        ...state,
        movies: {
          ...state.movies,
          ...action.payload.movies,
        },
      };
    case GET_MOVIE:
      return {
        ...state,
        currentMovie: action.payload.movie,
      };
    case ADD_MOVIE_RATING:
      return {
        ...state,
        movies: {
          ...state.movies,
          [action.payload.movie.id]: action.payload.movie,
        },
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
          ),
        },
      };
    case GET_MOVIES_MATCHING_SEARCH:
      return {
        ...state,
        searchMatches: action.payload.searchMatches,
      };
    default:
      return state;
  }
}

export default reducer;
