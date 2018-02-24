import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme, ThemeProvider } from 'styled-components';

import RespondBox from './RespondBox';

const ThreadContainer = styled.div.attrs({
  className: 'interactivethread',
})`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

const MessagesContainer = styled.div.attrs({
  className: 'interactivethread-messages-container',
})`
  height: 100%;
  background-color: ${props => (props.messagesContainer || {}).background || 'white'};
`;

const ResponseContainer = styled.div.attrs({
  className: 'interactivethread-responsecontainer',
})`
  // position relative to bottom of container to keep on top
  position: absolute;
  bottom: 0;
  right: 0;
`;

const InteractiveThreadContainer = (props) => {
  const {
    children,
    onSubmitMessage,
    theme,
  } = props;

  return (
    <ThemeProvider theme={theme}>
      <ThreadContainer>
        <MessagesContainer theme={theme}>
          {children}
        </MessagesContainer>

        <ResponseContainer>
          <RespondBox onSubmitMessage={onSubmitMessage} />
        </ResponseContainer>

      </ThreadContainer>
    </ThemeProvider>
  );
};

InteractiveThreadContainer.propTypes = {
  children: PropTypes.node,
  onSubmitMessage: PropTypes.func.isRequired,
  theme: PropTypes.object,
};

InteractiveThreadContainer.defaultProps = {
  children: null,
  theme: {},
};

export default withTheme(InteractiveThreadContainer);
