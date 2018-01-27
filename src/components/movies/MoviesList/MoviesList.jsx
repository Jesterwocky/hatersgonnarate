import React from 'react';
import PropTypes from 'prop-types';

import MovieItem from './MovieItem.jsx';

import {
  Link,
  List,
  BlankListItem
} from '../../_StyledComponents.jsx';

const MoviesList = ({ movies = [], getMovie }) => {
  const hasMovies = movies.length > 0;

  // TODO: movie click handler should open modal for that movie

  return (
    <List>
      {hasMovies &&
        movies.map(movie => (
          <MovieItem
            key={movie.id}
            getMovie={getMovie(movie.id)}
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
    name: PropTypes.string,
    blurb: PropTypes.string,
    ratings: PropTypes.shape({
      user: PropTypes.string,
      friends: PropTypes.string,
      sitewide: PropTypes.string
    })
  })),
  getMovie: PropTypes.func.isRequired
};

MoviesList.defaultProps = {
  movies: []
};

export default MoviesList;
