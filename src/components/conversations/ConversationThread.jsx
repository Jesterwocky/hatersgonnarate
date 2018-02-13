import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isEmpty } from '../../util/helpers';

import Message from './Message';

const ConversationThreadWrapper = styled.div.attrs({
  className: 'thread',
})`
  height: 100%;
  width: 100%;
`;

// TODO: if message is responding to the message immediately preceding it,
// don't quote that message in the response even if the data is there

const ConversationThread = ({
  messages,
  // movieId,
  user,
  target,
}) => {
  // make sure conversation is in order
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
  // movieId: PropTypes.string.isRequired,
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
