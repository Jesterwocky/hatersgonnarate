import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { starColor } from '../../../util/constants.js';

const defaultStarSize = 10;

const Star = styled.div`
  width: ${props => props.starSize || defaultStarSize}px;
  height: ${props => ((props.starSize || defaultStarSize) * (9 / 10))}px; // squatter stars
  display: flex;
  border: 1px solid #ecd6ab;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
`;

const StarHalf = styled.div`
  width: 50%;
  background-color: ${props => (
    props.filled ? starColor : 'transparent'
  )};
`;

function getUpdateRating(update, rating) {
  return () => update(rating);
}

const MovieRatingStar = ({
  starNumber,
  rating,
  starSize,
  canEdit,
  updateRating
}) => (
  <Star className="star" starSize={starSize}>
    <StarHalf
      className="star-left"
      filled={rating >= starNumber - 0.5}
      onClick={
        canEdit ?
        getUpdateRating(updateRating, starNumber - 0.5) :
        null
      }
    />
    <StarHalf
      className="star-right"
      filled={rating >= starNumber}
      onClick={
        canEdit ?
        getUpdateRating(updateRating, starNumber) :
        null
      }
    />
  </Star>
);

MovieRatingStar.propTypes = {
  starNumber: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  canEdit: PropTypes.bool,
  starSize: PropTypes.number,
  updateRating: PropTypes.func.isRequired
};

MovieRatingStar.defaultProps = {
  starSize: '10px',
  canEdit: false
};

export default MovieRatingStar;
