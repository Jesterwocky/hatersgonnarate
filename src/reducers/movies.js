import {
  GET_MOVIES,
  GET_MOVIE,
  UPDATE_MOVIE_RATING,
  START_RERATE,
  UPDATE_RERATE
} from '../actions/movies.js';

const initialState = {
  movies: {},
  currentMovie: {},
  reRate: {}
};

function getMovieWithUpdatedRating(movies, movieId, rating) {
  const movie = (movies || {})[movieId] || {};
  const ratingAsString = rating.toString();

  return {
    [movieId]: {
      ...movie,
      ratings: {
        ...movie.ratings,
        user: ratingAsString
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
            action.payload.rating
          )
        }
      };
    case START_RERATE:
      return {
        ...state,
        reRate: {
          movieId: action.payload.movieId,
          ...action.payload.data
        }
      }
    case UPDATE_RERATE:
      return {
        ...state,
        reRate: {
          ...state.reRate,
          ...action.payload.data
        }
      };
    default:
      return state;
  }
}

export default reducer;
