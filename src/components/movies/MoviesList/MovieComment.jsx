import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Comment = styled.div`
  font-weight: ${props => (props.type === 'friend' ? '400' : 'normal')};
  padding: 15px 0 0;
`;

const Snippet = styled.div``;

const Author = styled.div`
  margin: 5px 0 0 30px;
  font-size: 11px;
`;

const MovieComment = ({
  type,
  id,
  username,
  snippet
}) => (
  <Comment type={type}>
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
  snippet: PropTypes.string.isRequired
};

export default MovieComment;
