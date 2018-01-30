import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { updateMovieRating } from '../../../actions/movies.js';

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
  function createUpdateRating(id) {
    return newRating => updateRating(id, newRating);
  }

  return (
    <Rating width={ratingWidth}>
      {Array.from({ length: movieRatingsOutOf }, (x, index) => index + 1)
        .map(starNumber => (
          <MovieRatingStar
            starNumber={starNumber}
            rating={rating}
            starSize={ratingWidth / movieRatingsOutOf}
            canEdit={canEdit}
            updateRating={createUpdateRating(movieId)}
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
