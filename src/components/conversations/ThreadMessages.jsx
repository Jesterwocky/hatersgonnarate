import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { withTheme, ThemeProvider } from 'styled-components';

import { DARK } from '../../util/themes';
import { isEmpty } from '../../util/helpers';

import Message from './Message';

function groupMessages(messages) {
  return messages.reduce((groupedMessages, currentMessage) => {
    const lastGroup = groupedMessages[groupedMessages.length - 1] || [];
    const lastMessageOfLastGroup = lastGroup[lastGroup.length - 1] || {};

    if (
      lastMessageOfLastGroup.sender &&
      lastMessageOfLastGroup.sender.id === currentMessage.sender.id
    ) {
      return groupedMessages.slice(0, groupedMessages.length - 1)
        .concat([lastGroup.concat([currentMessage])]);
    }

    return groupedMessages.concat([[currentMessage]]);
  }, []);
}

const ThreadMessagesWrapper = styled.div.attrs({
  className: 'threadmessages',
})`
  height: 100%;
  width: 100%;
  padding: 4% 5% 8%;
  box-sizing: border-box;
  background-color: ${props => (props.theme.messagesContainer || {}).background || 'black'};
`;

// TODO: if message is responding to the message immediately preceding it,
// don't quote that message in the response even if the data is there

const ThreadMessages = ({
  messages,
  user,
  targetUser,
  includeSenderSummary,
  theme,
}) => {
  // make sure conversation is in order
  const messageList = Object.keys(messages)
    .sort().map(key => messages[key]);

  return (
    <ThemeProvider theme={{ ...theme, star: DARK.star }}>

      <ThreadMessagesWrapper>
        {groupMessages(messageList).map(messageGroup => (
          <Message
            key={`messagegroup-${messageGroup[0].id}`}
            messageGroup={messageGroup}
            sender={messageGroup[0].sender}
            includeSenderSummary={includeSenderSummary}
            isRightSideResponder={
              isEmpty(targetUser) ?
              messageGroup[0].sender.id === user.id :
              messageGroup[0].sender.id === targetUser.id
            }
          />
        ))}
      </ThreadMessagesWrapper>

    </ThemeProvider>
  );
};

ThreadMessages.propTypes = {
  messages: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  targetUser: PropTypes.object,
  includeSenderSummary: PropTypes.bool,
  theme: PropTypes.object,
};

ThreadMessages.defaultProps = {
  targetUser: {},
  includeSenderSummary: false,
  theme: {},
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(withTheme(ThreadMessages));
