import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, withTheme } from 'styled-components';

import { MESSAGE_THEMES } from '../../../../util/themes';
import SeedParticipantSummary from './SeedParticipantSummary';

const defaultTheme = MESSAGE_THEMES.seed;

const circleDiameter = 36; // px

const SeedConvoThreadHeaderContainer = styled.div.attrs({
  className: 'seedconvothreadheader',
})`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative; // for positioning @ symbol
`;

const SeedParticipantSummaryContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; // for positioning circle behind @ symbol
  overflow: hidden; // to clip circle
`;

const InitiatorSummary = SeedParticipantSummaryContainer.extend.attrs({
  className: 'seedconvothreadheader-personsummarycontainer',
})`
  background-color: ${props => (
    (props.theme.messagesLeft || defaultTheme.messagesLeft).background
  )}
`;

const ResponderSummary = SeedParticipantSummaryContainer.extend.attrs({
  className: 'seedconvothreadheader-personsummarycontainer',
})`
  background-color: ${props => (
    (props.theme.messagesRight || defaultTheme.messagesRight).background
  )}
`;

const VsText = styled.p.attrs({
  className: 'seedconvothreadheader-vstext',
})`
  font-weight: 300;
  font-size: 20px;
  margin: 0 7px;
  position: absolute;
  top: 10px;
  left: 45.5%;
  z-index: 999;
`;

const VsBackgroundCircle = styled.div.attrs({
  className: 'seedconvothreadheader-circle',
})`
  height: ${circleDiameter}px;
  width: ${circleDiameter}px;
  position: absolute;
  top: 2px;
  border-radius: 100%;
`;

const LeftCircle = VsBackgroundCircle.extend.attrs({
  className: 'seedconvothreadheader-circle seedconvothreadheader-circle-left',
})`
  right: -${circleDiameter / 2}px;
  background-color: ${props => (
    (props.theme.messagesRight || defaultTheme.messagesRight).background
  )}
`;

const RightCircle = VsBackgroundCircle.extend.attrs({
  className: 'seedconvothreadheader-circle seedconvothreadheader-circle-right',
})`
  left: -${circleDiameter / 2}px;
  background-color: ${props => (
    (props.theme.messagesLeft || defaultTheme.messagesLeft).background
  )}
`;

const SeedConvoThreadHeader = ({
  initiator,
  targetUser,
  movieId,
  theme,
}) => (
  <ThemeProvider theme={theme}>
    <SeedConvoThreadHeaderContainer>
      <InitiatorSummary>
        <SeedParticipantSummary
          {...initiator}
          rating={initiator.ratingSnapshot.rating}
          movieId={movieId}
        />
        <LeftCircle />
      </InitiatorSummary>

      <VsText>@</VsText>

      <ResponderSummary>
        <SeedParticipantSummary
          {...targetUser}
          rating={targetUser.ratingSnapshot.rating}
          movieId={movieId}
        />
        <RightCircle />
      </ResponderSummary>
    </SeedConvoThreadHeaderContainer>
  </ThemeProvider>
);

SeedConvoThreadHeader.propTypes = {
  initiator: PropTypes.object.isRequired,
  targetUser: PropTypes.object.isRequired,
  movieId: PropTypes.string.isRequired,
  theme: PropTypes.object,
};

SeedConvoThreadHeader.defaultProps = {
  theme: {},
};

export default withTheme(SeedConvoThreadHeader);
