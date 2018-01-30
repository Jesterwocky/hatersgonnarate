import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MovieRatings from './MovieRatings.jsx';
import MovieCallout from './MovieCallout.jsx';
import MovieComment from './MovieComment.jsx';

import {
  ListItem,
} from '../../_StyledComponents.jsx';

const Movie = ListItem.extend`
  padding: 10px 0;
  border-top: 1px solid orange;

  &:last-child {
    border-bottom: 1px solid orange;
  }
`;

const MovieTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: orange;
  margin: 0 0 5px 0;
`;

const Blurb = styled.p`
  font-size: 11px;
  margin: 5p 0;
`;

const MovieItem = ({
  id,
  name,
  ratings,
  blurb,
  activity,

  getMovie,
  updateMovieRating
}) => {
  const hasCallouts =
    activity &&
    activity.callouts
    && activity.callouts.length > 0;

  const hasFriendComments =
    !hasCallouts &&
    activity &&
    activity.friendComments.length > 0;

  const hasStrangerComments =
    !hasCallouts &&
    !hasFriendComments &&
    activity &&
    activity.strangerComments &&
    activity.strangerComments.length > 0;

  const haveNotSeenIt = false;

  return (
    <Movie
      key={`movie-${id}`}
      onClick={getMovie}
    >
      <MovieTitle>{name}</MovieTitle>
      {haveNotSeenIt &&
        <Blurb>{blurb}</Blurb>
      }

      <MovieRatings
        movieId={id}
        ratings={ratings}
        updateRating={updateMovieRating}
      />

      {hasCallouts && activity.callouts.map(callout => (
        <MovieCallout
          key={`callout-${callout.id}`}
          {...callout}
        />
      ))}

      {hasFriendComments && activity.friendComments.map(friendComment => (
        <MovieComment
          key={`comment-${id}-${friendComment.username}`}
          type="friend"
          {...friendComment}
        />
      ))}

      {hasStrangerComments && activity.strangerComments.map(strangerComment => (
        <MovieComment
          key={`comment-${id}-${strangerComment.username}`}
          type="friend"
          {...strangerComment}
        />
      ))}
    </Movie>
  );
};

MovieItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  getMovie: PropTypes.func.isRequired,
  blurb: PropTypes.string,
  updateMovieRating: PropTypes.func,
  ratings: PropTypes.object
};

MovieItem.defaultProps = {
  ratings: {},
  blurb: '',
  updateMovieRating: null
};

export default MovieItem;
