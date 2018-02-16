import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Overleaf = styled.div.attrs({
  className: 'seedthread-overleaf',
})``;

const SeedConvoOverleaf = ({
  username,
  agrees,
  movie,
}) => (
  <Overleaf>
    <p>{username}</p>
    <p>{agrees ? 'Agrees' : 'Disagrees'} with you about</p>
    <p>{movie.name}</p>
    <p>Also agrees with you about:</p>
    <ul>
      <li>The Mummy</li>
      <li>Chappie</li>
      <li>A Futile and Stupid Gesture</li>
    </ul>
    <p>How did {username} rate...</p>
    <p>look up movie or genre here</p>
  </Overleaf>
);

SeedConvoOverleaf.propTypes = {
  username: PropTypes.string.isRequired,
  movie: PropTypes.object.isRequired,
  agrees: PropTypes.bool,
};

SeedConvoOverleaf.defaultProps = {
  agrees: false,
};

export default SeedConvoOverleaf;
