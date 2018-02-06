import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DARK } from '../../../util/themes';

import MovieRatings from './MovieRatings';
import MovieCallout from './MovieCallout';
import MovieComment from './MovieComment';

import {
  ListItem,
} from '../../_StyledComponents';

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

const commentLimit = 3;

const MovieItem = ({
  id,
  title,
  blurb,
  ratings,
  callouts,
  comments,

  getMovie,
  updateRating,
}) => {
  const hasCallouts = callouts && callouts.length > 0;

  const hasFriendComments = comments &&
    (comments.byFriend || []).length > 0;

  const hasStrangerComments = comments &&
    (comments.byStrangers || []).length > 0;

  return (
    <Movie
      key={`movie-${id}`}
      onClick={getMovie}
    >
      <MovieTitle>{title}</MovieTitle>

      <MovieRatings
        movieId={id}
        ratings={ratings}
        updateRating={updateRating}
      />

      {hasCallouts &&
        <Callouts>
          {callouts.map(callout => (
            <MovieCallout
              key={`callout-${callout.id}`}
              {...callout}
            />
          ))}
        </Callouts>
      }

      {!hasCallouts && hasFriendComments &&
        comments.byFriends.slice(0, commentLimit).map(friendComment => (
          <MovieComment
            key={`comment-${id}-${friendComment.username}`}
            type="friend"
            {...friendComment}
          />
      ))}

      {!hasCallouts && !hasFriendComments && hasStrangerComments &&
        comments.byStrangers.slice(0, commentLimit).map(strangerComment => (
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
  blurb: PropTypes.string,
  ratings: PropTypes.object,
  callouts: PropTypes.array,
  comments: PropTypes.object,

  getMovie: PropTypes.func.isRequired,
  updateRating: PropTypes.func.isRequired,
};

MovieItem.defaultProps = {
  blurb: '',
  ratings: {},
  callouts: [],
  comments: {},
};

export default MovieItem;
