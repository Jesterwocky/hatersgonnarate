import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PersonSummary from '../PersonSummary';

const SeedConvoThreadHeaderContainer = styled.div.attrs({
  className: 'seedconvothreadheader',
})`
  display: flex;
`;

const PersonSummaryContainer = styled.div`
  width: 100%;
`;

const InitiatorSummary = PersonSummaryContainer.extend.attrs({
  className: 'calloutmodal-personsummarycontainer',
})`
  justify-content: flex-end;
`;

const ResponderSummary = PersonSummaryContainer.extend.attrs({
  className: 'calloutmodal-personsummarycontainer',
})`
  justify-content: flex-start;
`;

const VsText = styled.p.attrs({
  className: 'calloutmodal-conversation-vstext',
})`
  font-weight: 300;
  font-size: 12px;
  margin: 0 7px;
  padding-top: 5px;
`;

const SeedConvoThreadHeader = ({
  initiator,
  target,
  movieId,
}) => {
  return (
    <SeedConvoThreadHeaderContainer>
      <InitiatorSummary>
        <PersonSummary
          {...initiator}
          rating={initiator.ratingSnapshot.rating}
          movieId={movieId}
        />
      </InitiatorSummary>

      <VsText>@</VsText>

      <ResponderSummary>
        <PersonSummary
          {...target}
          rating={target.ratingSnapshot.rating}
          movieId={movieId}
        />
      </ResponderSummary>
    </SeedConvoThreadHeaderContainer>
  );
};

SeedConvoThreadHeader.propTypes = {
  initiator: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
  movieId: PropTypes.string.isRequired,
};

export default SeedConvoThreadHeader;
