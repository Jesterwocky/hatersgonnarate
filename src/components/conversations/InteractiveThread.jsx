import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme, ThemeProvider } from 'styled-components';

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
  background-color: ${props => (props.messagesContainer || {}).background || 'white'};
`;

const InteractiveThread = (props) => {
  const {
    messages,
    target,
    onSubmitMessage,
    threadContainer,
    includeSenderSummary,
    theme,
  } = props;
  const MessagesContainer = threadContainer || DefaultMessagesContainer;

  return (
    <ThemeProvider theme={theme}>
      <InteractiveThreadContainer {...props}>
        <MessagesContainer {...props} theme={theme}>
          <ThreadMessages
            messages={messages}
            target={target}
            includeSenderSummary={includeSenderSummary}
          />
        </MessagesContainer>
        <RespondBox onSubmitMessage={onSubmitMessage} />
      </InteractiveThreadContainer>
    </ThemeProvider>
  );
};

InteractiveThread.propTypes = {
  messages: PropTypes.object,
  onSubmitMessage: PropTypes.func.isRequired,
  target: PropTypes.object,
  threadContainer: PropTypes.func,
  includeSenderSummary: PropTypes.bool,

  theme: PropTypes.object,
};

InteractiveThread.defaultProps = {
  messages: {},
  target: {},
  threadContainer: null,
  includeSenderSummary: false,

  theme: {},
};

export default withTheme(InteractiveThread);
