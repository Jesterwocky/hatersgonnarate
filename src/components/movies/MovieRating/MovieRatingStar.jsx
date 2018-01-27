import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const defaultStarSize = '10px';

const Star = styled.div`
  width: ${props => props.starSize || defaultStarSize};
  height: ${props => props.starSize || defaultStarSize};
  display: flex;
  border: 1px solid orange;
`;

const StarHalf = styled.div`
  width: 50%;
  background-color: ${props => (
    props.filled ? 'yellow' : 'transparent'
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
  starSize: PropTypes.string,
  updateRating: PropTypes.func.isRequired
};

MovieRatingStar.defaultProps = {
  starSize: '10px',
  canEdit: false
};

export default MovieRatingStar;
