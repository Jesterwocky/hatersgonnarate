import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { updateMovieRating } from '../../../actions/movies.js';

import { movieRatingsOutOf } from '../../../util/constants.js';

import MovieRatingStar from './MovieRatingStar.jsx';

const Rating = styled.div`
  display: flex;
  width: ${props => `${props.width}px` || '100px'};
  justify-content: space-between;
  flex-wrap: no-wrap;
`;

const defaultRatingWidth = 100;
const spacingReductionFactor = 75/100;

function createUpdateRating(update, id) {
  return rating => update(id, rating);
}

function getStarSize(ratingWidth) {
  return (ratingWidth / movieRatingsOutOf) *
  spacingReductionFactor;
}

const MovieRating = ({
  movieId,
  canEdit = false,
  rating,
  ratingWidth = defaultRatingWidth,
  updateRating
}) => {
  return (
    <Rating width={ratingWidth}>
      {Array.from({ length: movieRatingsOutOf }, (x, index) => index + 1)
        .map(starNumber => (
          <MovieRatingStar
            starNumber={starNumber}
            rating={rating}
            starSize={`${getStarSize(ratingWidth)}px`}
            canEdit={canEdit}
            updateRating={createUpdateRating(updateRating, movieId)}
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
  rating: PropTypes.number,
  ratingWidth: PropTypes.number,
  updateRating: PropTypes.func
};

MovieRating.defaultProps = {
  canEdit: false,
  rating: 1,
  ratingWidth: 100,
  updateRating: null
};

function mapDispatchToProps(dispatch) {
  return {
    updateRating: (id, rating) => updateMovieRating(dispatch, id, rating)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(MovieRating);
