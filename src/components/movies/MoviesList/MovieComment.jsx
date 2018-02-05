import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Comment = styled.div.attrs({
  className: 'movie-comment',
})`
  font-weight: ${props => (props.type === 'friend' ? '400' : 'normal')};
  padding: 15px 0 0;
`;

const Snippet = styled.div.attrs({
  className: 'movie-comment-snippet',
})``;

const Author = styled.div.attrs({
  className: 'movie-comment-author',
})`
  margin: 5px 0 0 30px;
  font-size: 11px;
`;

const MovieComment = ({
  type,
  id,
  username,
  snippet,
}) => (
  <Comment type={type} className={`movie-${id}-comment`}>
    <Snippet>
      “{snippet}”
    </Snippet>
    <Author>
      —{username}
    </Author>
  </Comment>
);

MovieComment.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  snippet: PropTypes.string.isRequired,
};

export default MovieComment;
