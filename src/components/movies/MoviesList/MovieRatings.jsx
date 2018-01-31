import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { defaultStarsWidth } from '../../../util/constants.js';
import { hasKey } from '../../../util/helpers';

import MovieRating from '../MovieRating/MovieRating.jsx';

const RatingsList = styled.div`
  font-size: 12px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
`;

const RatingsHeading = styled.span`
  margin: 0 7px 0 0;
  width: 40%;
  font-size: 11px;
  font-weight: 600;
  text-align: right;
`;

const ratingLabels = {
  user: 'Me',
  friends: 'Friends',
  sitewide: 'Everybody'
};

const MovieRatings = ({ ratings = {}, movieId, updateRating }) => (
  <RatingsList className="movie-item-ratings">

    {Object.keys(ratings)
      .filter(ratingType => hasKey(ratingLabels, ratingType))
      .map(ratingType => (
        <Rating
          key={`rating-${ratingType}-movie${movieId}`}
          className="movie-item-ratings-rating"
        >

          <RatingsHeading className="movie-item-ratings-rating-heading">
            {ratingLabels[ratingType]}
          </RatingsHeading>

          <MovieRating
            className="movie-item-ratings-rating-starscontainer"
            movieId={movieId}
            rating={parseFloat(ratings[ratingType])}
            ratingWidth={defaultStarsWidth}
            canEdit={ratingType === 'user'}
            updateRating={updateRating}
          />

        </Rating>
    ))}
  </RatingsList>
);

MovieRatings.propTypes = {
  movieId: PropTypes.string.isRequired,
  ratings: PropTypes.shape({
    user: PropTypes.string,
    friends: PropTypes.string,
    sitewide: PropTypes.string
  }),
  updateRating: PropTypes.func.isRequired
};

MovieRatings.defaultProps = {
  ratings: {}
};

export default MovieRatings;
