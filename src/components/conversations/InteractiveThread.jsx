import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ThreadMessages from './ThreadMessages';
import RespondBox from './RespondBox';

const InteractiveThreadContainer = styled.div.attrs({
  className: 'interactivethread',
})`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DefaultMessagesContainer = styled.div.attrs({
  className: 'interactivethread-messages-container',
})`
  height: 100%;
`;

const InteractiveThread = (props) => {
  const {
    messages,
    target,
    onSubmitMessage,
    threadContainer,
    includeSenderSummary,
  } = props;
  const MessagesContainer = threadContainer || DefaultMessagesContainer;

  return (
    <InteractiveThreadContainer>
      <MessagesContainer {...props}>
        <ThreadMessages
          messages={messages}
          target={target}
          includeSenderSummary={includeSenderSummary}
        />
      </MessagesContainer>
      <RespondBox onSubmitMessage={onSubmitMessage} />
    </InteractiveThreadContainer>
  );
};

InteractiveThread.propTypes = {
  messages: PropTypes.object,
  onSubmitMessage: PropTypes.func.isRequired,
  target: PropTypes.object,
  threadContainer: PropTypes.func,
  includeSenderSummary: PropTypes.bool,
};

InteractiveThread.defaultProps = {
  messages: {},
  target: {},
  threadContainer: null,
  includeSenderSummary: false,
};

export default InteractiveThread;
