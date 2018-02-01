import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { starColor } from '../../../util/constants.js';

const StarContainer = styled.div.attrs({
  className: 'star'
})`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ClippedStar = styled.div.attrs({
  className: 'star-clip'
})`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.width || 100}%;
  height: ${props => props.height || 100}%;
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
    39% 35%
  );
`;

const OuterClippedStar = ClippedStar.extend`
  top: -5%;
  left: -5%;
`;

const InnerClippedStar = ClippedStar.extend`
  width: 90%;
  height: 90%;
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

const MovieRatingStar = ({
  starNumber,
  rating,
  canEdit,
  updateRating
}) => {
  const reductionPercent = 10;

  // TODO: better way to prevent click on a friend's rating or
  // sitewide rating from updating your rating (vs relying on 'edit' prop)
  function getUpdateRating(newRating) {
    return () => updateRating(newRating);
  }

  return (
    <StarContainer>

      <OuterClippedStar>
        <StarBackgroundToMakeBorder className="star-border" />
      </OuterClippedStar>

      <InnerClippedStar>
        <EmptyStarCore className="star-empty" />
      </InnerClippedStar>

      <InnerClippedStar>
        <StarHalf
          className="star-left"
          filled={rating >= starNumber - 0.5}
          onClick={
            canEdit ?
            getUpdateRating(starNumber - 0.5) :
            null
          }
        />
        <StarHalf
          className="star-right"
          filled={rating >= starNumber}
          onClick={
            canEdit ?
            getUpdateRating(starNumber) :
            null
          }
        />
    </InnerClippedStar>
    </StarContainer>
  );
};

MovieRatingStar.propTypes = {
  starNumber: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  canEdit: PropTypes.bool,
  updateRating: PropTypes.func.isRequired
};

MovieRatingStar.defaultProps = {
  canEdit: false
};

export default MovieRatingStar;
