import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateMovieRating } from '../../../actions/movies.js';

import MovieItem from './MovieItem.jsx';

import {
  Link,
  List,
  BlankListItem
} from '../../_StyledComponents.jsx';

const MoviesList = ({ movies = [], getMovie, updateRating }) => {
  const hasMovies = movies.length > 0;

  function getUpdateRating(movieId) {
    return newRating => updateRating(movieId, newRating);
  }

  // TODO: movie click handler should open modal for that movie

  return (
    <List>
      {hasMovies &&
        movies.map(movie => (
          <MovieItem
            key={`movie-${movie.id}`}
            getMovie={getMovie(movie.id)}
            updateRating={getUpdateRating(movie.id)}
            {...movie}
          />
        ))
      }
      {!hasMovies &&
        <BlankListItem>
          Seen any good movies lately?
          {' '}
          <Link href="http://google.com">
            Rate and compare with your frenemies.
          </Link>
        </BlankListItem>
      }
    </List>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    blurb: PropTypes.string,
    ratings: PropTypes.shape({
      user: PropTypes.string,
      friends: PropTypes.string,
      sitewide: PropTypes.string
    })
  })),
  getMovie: PropTypes.func.isRequired,
  updateRating: PropTypes.func.isRequired
};

MoviesList.defaultProps = {
  movies: []
};

function mapDispatchToProps(dispatch) {
  return {
    updateRating: (id, rating) => updateMovieRating(dispatch, id, rating)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(MoviesList);
