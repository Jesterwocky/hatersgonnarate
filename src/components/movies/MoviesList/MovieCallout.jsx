import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const shameColor = '#ffadbd';
const shameBG = '#c12e41';

const agreeColor = '#14d652';
const agreeBG = '#238427';

function getContainerColor({ type }) {
  return type === 'shame' ? shameBG : agreeBG;
}

function getTextColor({ type }) {
  return type === 'shame' ? shameColor : agreeColor;
}

const CalloutContainer = styled.div`
  background-color: ${getContainerColor};
  color: white;
  font-size: 11px;
  text-align: center;
  padding: 7px 7px 9px;
  margin-top: 5px;
  border-radius: 2px;
  box-shadow: 1px 1px 4px #ababab;
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

const ShameOrApplaud = styled.div`
  color: ${getTextColor};
  font-weight: 600;
  font-size: 18px;
  padding: 3px 0;
`;

const FightingWords = styled.div`
  font-style: italic;
`;

const typeLabels = {
  shame: 'Shame',
  applaud: 'Agree'
};

const MovieCallout = ({
  fromFriend,
  toFriend,
  type,
  starter
}) => (
  <CalloutContainer type={type}>
    <Versus>
      <Name>
        {fromFriend.username}
      </Name>
      <ConnectorText>@</ConnectorText>
      <Name>
        {toFriend.username}
      </Name>
    </Versus>

    <ShameOrApplaud type={type}>
      {typeLabels[type]}!
    </ShameOrApplaud>

    <FightingWords>
      “{starter}”
    </FightingWords>
  </CalloutContainer>
);

MovieCallout.propTypes = {
  fromFriend: PropTypes.shape({
    username: PropTypes.string
  }).isRequired,
  toFriend: PropTypes.shape({
    username: PropTypes.string
  }).isRequired,
  type: PropTypes.string.isRequired,
  starter: PropTypes.string.isRequired
}

export default MovieCallout;
