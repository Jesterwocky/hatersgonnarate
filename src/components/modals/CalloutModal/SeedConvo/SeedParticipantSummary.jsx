import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MovieRating from '../../../movies/MovieRating/MovieRating';

const starsWidth = 60;
const starsOffset = starsWidth / 6;

const SeedParticipantSummaryContainer = styled.div.attrs({
  className: 'personsummary-ratingcontainer',
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: ${starsOffset}px;
`;

const MovieRatingContainer = styled.div.attrs({
  className: 'personsummary-movieratingcontainer',
})`
  position: absolute;
  top: -${starsOffset}px;
`;

const Username = styled.div.attrs({
  className: 'personsummary-username',
})``;

const Snippet = styled.div.attrs({
  className: 'personsummary-snippet',
})``;

// TODO: have state. Show pop-up with snippet and
// stats or whatever on hover or on click expand icon
// (whichever works better)
const SeedParticipantSummary = ({
  // userId,
  username,
  movieId,
  rating,
  snippet,
}) => {
  return (
    <SeedParticipantSummaryContainer>
      <MovieRatingContainer>
        <MovieRating
          movieId={movieId}
          rating={rating}
          width={starsWidth}
        />
      </MovieRatingContainer>
      <Username>
        {username}
      </Username>
      {snippet &&
        <Snippet>{snippet}</Snippet>
      }
    </SeedParticipantSummaryContainer>
  );
};

SeedParticipantSummary.propTypes = {
  // userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  movieId: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  snippet: PropTypes.string,
};

SeedParticipantSummary.defaultProps = {
  snippet: '',
};

export default SeedParticipantSummary;
