import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isEmpty } from '../../util/helpers';

import Message from './Message';

const ConversationThreadWrapper = styled.div.attrs({
  className: 'conversation-thread',
})``;

// TODO: verify conversation is in order

const ConversationThread = ({
  messages,
  movieId,
  user,
  target,
}) => {
  const messageList = Object.keys(messages)
    .sort().map(key => messages[key]);

  return (
    <ConversationThreadWrapper>
      {messageList.map(message => (
        <Message
          key={`message-${message.id}`}
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
    </ConversationThreadWrapper>
  );
};

ConversationThread.propTypes = {
  messages: PropTypes.object.isRequired,
  movieId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  target: PropTypes.object,
};

ConversationThread.defaultProps = {
  target: {},
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(ConversationThread);
