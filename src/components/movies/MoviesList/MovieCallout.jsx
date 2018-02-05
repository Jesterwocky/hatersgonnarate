import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const shameBG = '#b72538';
const agreeBG = '#398e3d';

function getContainerColor({ type }) {
  return type === 'shame' ? shameBG : agreeBG;
}

const CalloutContainer = styled.div`
  background-color: ${getContainerColor};
  color: white;
  font-size: 11px;
  text-align: center;
  padding: 7px 7px 9px;
  margin-top: 10px;
  border-radius: 2px;
`;

const Versus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; // center words horizontally
`;

const Name = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

const ConnectorText = styled.span`
  font-size: 8px;
  padding: 0 3px;
`;

const FightingWords = styled.div`
  font-style: italic;
  margin-top: 5px;
`;

// const typeLabels = {
//   shame: 'Shame',
//   applaud: 'Agree'
// };

const MovieCallout = ({
  fromFriend,
  toFriend,
  type,
  starter,
}) => (
  <CalloutContainer type={type}>
    <Versus>
      <Name>
        {fromFriend.username}
      </Name>
      <ConnectorText>{'>'}</ConnectorText>
      <Name>
        {toFriend.username}
      </Name>
    </Versus>
    <FightingWords>
      “{starter}”
    </FightingWords>
  </CalloutContainer>
);

MovieCallout.propTypes = {
  fromFriend: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  toFriend: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
  starter: PropTypes.string.isRequired,
};

export default MovieCallout;
