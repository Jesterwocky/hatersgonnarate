import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { movieRatingsOutOf, defaultStarsWidth } from '../../../util/constants.js';

import MovieRatingStar from './MovieRatingStar.jsx';

const Rating = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-wrap: no-wrap;
  width: ${props => `${props.width}px` || `${defaultStarsWidth}px`};
  justify-content: space-between;
`;

const MovieRating = ({
  movieId,
  canEdit = false,
  rating = 0.5,
  ratingWidth = defaultStarsWidth,
  updateRating
}) => {
  return (
    <Rating width={ratingWidth}>
      {Array.from({ length: movieRatingsOutOf }, (x, index) => index + 1)
        .map(starNumber => (
          <MovieRatingStar
            starNumber={starNumber}
            rating={parseFloat(rating)}
            starSize={ratingWidth / movieRatingsOutOf}
            canEdit={canEdit}
            updateRating={updateRating}
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
  updateRating: PropTypes.func.isRequired
};

MovieRating.defaultProps = {
  canEdit: false,
  rating: 0.5,
  ratingWidth: 100,
};

export default MovieRating;
