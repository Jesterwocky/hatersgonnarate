import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { withTheme, ThemeProvider } from 'styled-components';

import { isEmpty } from '../../util/helpers';

import Message from './Message';

const ThreadMessagesWrapper = styled.div.attrs({
  className: 'threadmessages',
})`
  height: 100%;
  width: 100%;
  padding: 4% 8% 8%;
  box-sizing: border-box;
  background-color: ${props => (props.theme.messagesContainer || {}).background || 'black'};
`;

// TODO: if message is responding to the message immediately preceding it,
// don't quote that message in the response even if the data is there

const ThreadMessages = ({
  messages,
  user,
  target,
  includeSenderSummary,
  theme,
}) => {
  // make sure conversation is in order
  const messageList = Object.keys(messages)
    .sort().map(key => messages[key]);

  return (
    <ThemeProvider theme={theme}>

      <ThreadMessagesWrapper>
        {messageList.map(message => (
          <Message
            key={`message-${message.id}`}
            includeSenderSummary={includeSenderSummary}
            isRightSideResponder={
              isEmpty(target) ?
              message.sender.id === user.id :
              message.sender.id === target.id
            }
            {...message}
          >
            {message.text}
          </Message>
        ))}
      </ThreadMessagesWrapper>

    </ThemeProvider>
  );
};

ThreadMessages.propTypes = {
  messages: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  target: PropTypes.object,
  includeSenderSummary: PropTypes.bool,
  theme: PropTypes.object,
};

ThreadMessages.defaultProps = {
  target: {},
  includeSenderSummary: false,
  theme: {},
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(withTheme(ThreadMessages));
