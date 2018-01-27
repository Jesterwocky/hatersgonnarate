import {
  GET_MOVIES,
  GET_MOVIE,
  UPDATE_MOVIE_RATING
} from '../actions/movies.js';

const initialState = {
  movies: {},
  currentMovie: {}
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
    default:
      return state;
  }
}

export default reducer;
