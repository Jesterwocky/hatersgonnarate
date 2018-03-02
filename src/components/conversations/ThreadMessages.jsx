import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { withTheme, ThemeProvider } from 'styled-components';

import { DARK } from '../../util/themes';

import Message from './Message';

function getSorted(messages) {
  return Object.keys(messages)
    .sort().map(key => messages[key]);
}

function addMessageToLastGroup(groupedMessages, message) {
  return groupedMessages
    .slice(0, groupedMessages.length - 1)
    .concat([
      groupedMessages[groupedMessages.length - 1]
        .concat([message]),
    ]);
}

function sortAndGroup(messages) {
  return getSorted(messages).reduce((groupedMessages, currentMessage) => {
    const lastGroup = groupedMessages[groupedMessages.length - 1] || [];
    const lastMessage = lastGroup[lastGroup.length - 1] || {};
    const sameSender = lastMessage.sender &&
      lastMessage.sender.id === currentMessage.sender.id;

    return sameSender ?
      addMessageToLastGroup(groupedMessages, currentMessage) :
      groupedMessages.concat([[currentMessage]]);
  }, []);
}

const ThreadMessagesWrapper = styled.div.attrs({
  className: 'threadmessages',
})`
  height: 100%;
  width: 100%;
  padding: 4% 4% 8%;
  box-sizing: border-box;
  overflow: scroll;
`;

// TODO: if message is responding to the message immediately preceding it,
// don't quote that message in the response even if the data is there
const ThreadMessages = ({
  messages,
  user,
  targetUser,
  onClickMessage,
  theme,
}) => (
  <ThemeProvider theme={{ ...theme, star: DARK.star }}>

    <ThreadMessagesWrapper>
      {sortAndGroup(messages).map(messageGroup => (
        <Message
          key={`messagegroup-${messageGroup[0].id}`}
          messageGroup={messageGroup}
          sender={messageGroup[0].sender}
          includeSenderSummary={!targetUser}
          onClickMessage={onClickMessage}
          isRightSideResponder={
            !targetUser ?
            messageGroup[0].sender.id === user.id :
            messageGroup[0].sender.id === targetUser.id
          }
        />
      ))}
    </ThreadMessagesWrapper>

  </ThemeProvider>
);

ThreadMessages.propTypes = {
  messages: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  targetUser: PropTypes.object,
  onClickMessage: PropTypes.func,
  theme: PropTypes.object,
};

ThreadMessages.defaultProps = {
  targetUser: null,
  onClickMessage: null,
  theme: {},
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(withTheme(ThreadMessages));
