import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { starColor } from '../../../util/constants.js';

const defaultStarSize = 10;

// border: 1px solid #ecd6ab;

function getStarWidth(props) {
  return props.starSize || defaultStarSize;
}

function getStarHeight(props) {
  return (props.starSize || defaultStarSize) * (9 / 10);
}

const StarContainer = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: relative;
`;

const ClippedStar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: flex;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%);
`;

const OuterClippedStar = ClippedStar.extend`
  top: -1px;
  left: -1px;
`;

const StarCore = styled.div`
  width: 100%;
  height: 100%;
`;

const StarBackgroundToMakeBorder = StarCore.extend`
  background-color: #af8918;
`;

const EmptyStarCore = StarCore.extend`
  background-color: white;
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
  starSize = defaultStarSize,
  canEdit,
  updateRating
}) => {
  const outerStarWidth = starSize;
  const outerStarHeight = starSize * (9 / 10); // squatter star

  const innerStarWidth = outerStarWidth * (9 / 10);
  const innerStarHeight = outerStarHeight * (9 / 10);

  return (
    <StarContainer className="star" width={starSize} height={starSize}>

      <OuterClippedStar className="star-clip" width={outerStarWidth} height={outerStarHeight}>
        <StarBackgroundToMakeBorder className="star-border" />
      </OuterClippedStar>

      <ClippedStar className="star-clip" width={innerStarWidth} height={innerStarHeight}>
        <EmptyStarCore className="star-empty" />
      </ClippedStar>

      <ClippedStar className="star-clip" width={innerStarWidth} height={innerStarHeight}>
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
      </ClippedStar>
    </StarContainer>
  );
};

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
