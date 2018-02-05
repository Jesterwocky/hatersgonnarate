import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { DARK } from '../../../util/themes';

const innerStarPercentReduction = 20;

const StarContainer = styled.div.attrs({
  className: 'star',
})`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ClippedStar = styled.div`
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

const OuterClippedStar = ClippedStar.extend.attrs({
  className: 'star-outer-clip',
})`
  display: ${props => (
    (props.theme.star || DARK.star).hasBorder ?
      'initial' : 'none'
  )};
`;

function getInnerStarSize(props) {
  return (props.theme.star || DARK.star).hasBorder ?
    100 - innerStarPercentReduction : 100;
}

const InnerClippedStar = ClippedStar.extend.attrs({
  className: 'star-inner-clip',
})`
  width: ${getInnerStarSize}%;
  height: ${getInnerStarSize}%;

  // for every 10 percentage points the inner star size is reduced
  // to produce a border, offset 5% to keep inner star centered
  ${props => (props.theme.star || DARK.star).hasBorder && css`
    top: ${5 * (innerStarPercentReduction / 10)}%;
    left: ${5 * (innerStarPercentReduction / 10)}%;
  `}
`;

const StarCore = styled.div`
  width: 100%;
  height: 100%;
`;

const StarBackgroundToMakeBorder = StarCore.extend.attrs({
  className: 'star-border',
})`
  background-color: #af8918;
`;

const EmptyStar = StarCore.extend.attrs({
  className: 'star-empty',
})`
  background-color: white;
`;

const StarHalf = styled.div`
  width: 50%;
  background-color: ${props => (
    props.filled ?
      (props.theme.star || DARK.star).color :
      'transparent'
  )};
`;

const MovieRatingStar = ({
  starNumber,
  rating,
  canEdit,
  onUpdateRating,
}) => {
  // TODO: better way to prevent click on a friend's rating or
  // sitewide rating from updating your rating (vs relying on 'edit' prop)
  function getOnUpdateRating(newRating) {
    return () => onUpdateRating(newRating);
  }

  return (
    <StarContainer>

      <OuterClippedStar>
        <StarBackgroundToMakeBorder />
      </OuterClippedStar>

      <InnerClippedStar>
        <EmptyStar />
      </InnerClippedStar>

      <InnerClippedStar>
        <StarHalf
          className="star-left"
          filled={rating >= starNumber - 0.5}
          onClick={
            canEdit ?
            getOnUpdateRating(starNumber - 0.5) :
            null
          }
        />
        <StarHalf
          className="star-right"
          filled={rating >= starNumber}
          onClick={
            canEdit ?
            getOnUpdateRating(starNumber) :
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
  onUpdateRating: PropTypes.func.isRequired,
};

MovieRatingStar.defaultProps = {
  canEdit: false,
};

export default MovieRatingStar;
