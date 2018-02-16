import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isEmpty } from '../../util/helpers';
import { THREAD_BACKGROUND } from '../../util/themes';

import Message from './Message';

const ThreadMessagesWrapper = styled.div.attrs({
  className: 'threadmessages',
})`
  height: 100%;
  width: 100%;
  background-color: ${THREAD_BACKGROUND};
`;

// TODO: if message is responding to the message immediately preceding it,
// don't quote that message in the response even if the data is there

const ThreadMessages = ({
  messages,
  user,
  target,
  includeSenderSummary,
}) => {
  // make sure conversation is in order
  const messageList = Object.keys(messages)
    .sort().map(key => messages[key]);

  return (
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
  );
};

ThreadMessages.propTypes = {
  messages: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  target: PropTypes.object,
  includeSenderSummary: PropTypes.bool,
};

ThreadMessages.defaultProps = {
  target: {},
  includeSenderSummary: false,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(ThreadMessages);
