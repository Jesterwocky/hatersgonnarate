import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { defaultStarsWidth } from '../../../util/constants.js';

import MovieRating from '../MovieRating/MovieRating.jsx';

const Ratings = styled.div`
  font-size: 12px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
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

const MovieItemRatings = ({ ratings = {}, movieId, updateRating }) => (
  <Ratings className="movie-ratings">

    {Object.keys(ratings).map(ratingType => (
      <Rating
        key={`rating-${ratingType}-movie${movieId}`}
        className="movie-ratings-rating"
      >

        <RatingsHeading className="movie-ratings-rating-heading">
          {ratingLabels[ratingType]}
        </RatingsHeading>

        <MovieRating
          className="movie-ratings-rating-starscontainer"
          movieId={movieId}
          rating={parseFloat(ratings[ratingType])}
          ratingWidth={defaultStarsWidth}
          canEdit={ratingType === 'user'}
          updateRating={updateRating}
        />

      </Rating>
    ))}

  </Ratings>
);

MovieItemRatings.propTypes = {
  movieId: PropTypes.string.isRequired,
  ratings: PropTypes.shape({
    user: PropTypes.string,
    friends: PropTypes.string,
    sitewide: PropTypes.string
  }),
  updateRating: PropTypes.func
};

MovieItemRatings.defaultProps = {
  ratings: {},
  updateRating: null
};

export default MovieItemRatings;
