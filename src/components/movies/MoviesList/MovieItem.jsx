import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MovieItemRatings from './MovieItemRatings.jsx';

import {
  ListItem,
} from '../../_StyledComponents.jsx';

const Movie = ListItem.extend`
  padding: 10px 0;
  border-top: 1px solid orange;
  border-bottom: 1px solid orange;
`;

const MovieTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: orange;
`;

const Description = styled.p`
  font-size: 11px;
`;

const MovieItem = ({
  id,
  name,
  ratings,
  blurb,
  getMovie,
  updateMovieRating
}) => (
  <Movie
    key={`movie-${id}`}
    onClick={getMovie}
  >
    <MovieTitle>{name}</MovieTitle>

    <MovieItemRatings
      movieId={id}
      ratings={ratings}
      updateRating={updateMovieRating}
    />

    <Description>{blurb}</Description>
  </Movie>
);

MovieItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  getMovie: PropTypes.func.isRequired,
  blurb: PropTypes.string,
  updateMovieRating: PropTypes.func,
  ratings: PropTypes.object
};

MovieItem.defaultProps = {
  ratings: {},
  blurb: '',
  updateMovieRating: null
};

export default MovieItem;
