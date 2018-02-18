import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { movieRatingsOutOf } from '../../../util/constants';

import MovieRatingStar from './MovieRatingStar';

const Rating = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.width / movieRatingsOutOf}px;
  display: grid;
  grid-template-columns: repeat(${movieRatingsOutOf}, 1fr);
  cursor: ${props => (props.canEdit ? 'pointer' : 'default')};
`;

const MovieRating = ({
  movieId,
  width,
  canEdit = false,
  rating = 0.5,
  onUpdateRating,
  className,
}) => (
  <Rating
    className={`movie-rating-stars ${className}`}
    width={width}
    canEdit={canEdit}
  >
    {Array.from({ length: movieRatingsOutOf }, (x, index) => index + 1)
      .map(starNumber => (
        <MovieRatingStar
          starNumber={starNumber}
          rating={parseFloat(rating)}
          canEdit={canEdit}
          onUpdateRating={onUpdateRating}
          key={`star-${starNumber}-for-movie-${movieId}`}
        />
      ))
    }
  </Rating>
);

MovieRating.propTypes = {
  movieId: PropTypes.string,
  canEdit: PropTypes.bool,
  rating: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onUpdateRating: PropTypes.func,
  width: PropTypes.number.isRequired,
  className: PropTypes.string,
};

MovieRating.defaultProps = {
  movieId: '',
  canEdit: false,
  onUpdateRating: null,
  rating: 0.5,
  className: '',
};

export default MovieRating;
