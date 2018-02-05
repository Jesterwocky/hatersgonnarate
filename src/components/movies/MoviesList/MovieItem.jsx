import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DARK } from '../../../util/themes.js';

import MovieRatings from './MovieRatings.jsx';
import MovieCallout from './MovieCallout.jsx';
import MovieComment from './MovieComment.jsx';

import {
  ListItem,
} from '../../_StyledComponents.jsx';

const Movie = ListItem.extend`
  padding: 14px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: ${DARK.header.background};
`;

const MovieTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${DARK.movieTitleColor};
  margin: 0 0 5px 0;
`;

const Blurb = styled.p`
  font-size: 11px;
  margin: 5p 0;
`;

const Callouts = styled.div`
  margin-top: 14px;
`;

const MovieItem = ({
  id,
  title,
  ratings,
  blurb,
  activity,

  getMovie,
  updateRating,
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
      <MovieTitle>{title}</MovieTitle>

      {haveNotSeenIt &&
        <Blurb>{blurb}</Blurb>
      }

      <MovieRatings
        movieId={id}
        ratings={ratings}
        updateRating={updateRating}
      />

      {hasCallouts &&
        <Callouts>
          {activity.callouts.map(callout => (
            <MovieCallout
              key={`callout-${callout.id}`}
              {...callout}
            />
          ))}
        </Callouts>
      }

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
  title: PropTypes.string.isRequired,
  getMovie: PropTypes.func.isRequired,
  updateRating: PropTypes.func.isRequired,
  blurb: PropTypes.string,
  ratings: PropTypes.object,
  activity: PropTypes.object,
};

MovieItem.defaultProps = {
  ratings: {},
  blurb: '',
  activity: {},
};

export default MovieItem;
