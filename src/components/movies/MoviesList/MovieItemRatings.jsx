import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MovieRating from '../MovieRating/MovieRating.jsx';

const ratingWidth = 100;

const Ratings = styled.div`
  font-size: 12px;
  width: ${ratingWidth}px;
`;

const Rating = styled.div`
`;

const RatingsHeading = styled.h3`
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
