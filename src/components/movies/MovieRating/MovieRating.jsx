import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { movieRatingsOutOf, defaultStarsWidth } from '../../../util/constants.js';

import MovieRatingStar from './MovieRatingStar.jsx';

const Rating = styled.div.attrs({
  className: 'movie-rating-stars'
})`
  width: ${props => props.width}px;
  height: ${props => props.width / movieRatingsOutOf}px;
  display: grid;
  grid-template-columns: repeat(${movieRatingsOutOf}, 1fr);
`;

const MovieRating = ({
  movieId,
  width,
  canEdit = false,
  rating = 0.5,
  onUpdateRating
}) => {
  return (
    <Rating width={width}>
      {Array.from({ length: movieRatingsOutOf }, (x, index) => index + 1)
        .map(starNumber => (
          <MovieRatingStar
            starNumber={starNumber}
            rating={parseFloat(rating)}
            canEdit={canEdit}
            onUpdateRating={onUpdateRating}
            key={`star-${starNumber}`}
          />
        ))
      }
    </Rating>
  );
};

MovieRating.propTypes = {
  movieId: PropTypes.string.isRequired,
  canEdit: PropTypes.bool,
  rating: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  ratingWidth: PropTypes.number,
  onUpdateRating: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired
};

MovieRating.defaultProps = {
  canEdit: false,
  rating: 0.5,
  ratingWidth: 100,
};

export default MovieRating;
