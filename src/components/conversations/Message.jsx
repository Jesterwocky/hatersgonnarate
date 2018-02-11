import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { MESSAGE_THEMES } from '../../util/themes';

const defaultTheme = MESSAGE_THEMES.SEED;

const MessageContainer = styled.div.attrs({
  className: 'message',
})`
  padding: 5px 10px;
  ${(props) => {
    const messagesRight = props.theme.messagesRight || defaultTheme.messagesRight;
    const messagesLeft = props.theme.messagesLeft || defaultTheme.messagesLeft;
    if (props.isRightSideResponder) {
      return css`
        background-color: ${messagesRight.background};
        color: ${messagesRight.color};
        margin: 5px 0 5px 5px;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      `;
    }
    return css`
      background-color: ${messagesLeft.background};
      color: ${messagesLeft.color};
      margin: 5px 5px 5px 0;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    `;
  }}
`;

const MessageTextContainer = styled.div.attrs({
  className: 'message-textcontainer',
})``;

const MessageText = styled.div.attrs({
  className: 'message-text',
})``;

const Quotation = styled.div.attrs({
  className: 'message-text-quotation',
})``;

const MessageDrawerHandle = styled.div.attrs({
  className: 'message-drawerhandle',
})``;

// TODO: only show message details on click drawerhandle
const MessageDetails = styled.div.attrs({
  className: 'message-drawer',
})`
  display: none;
`;

// right-side-responder = target in a callout, or current user in a group convo.
const Message = ({
  text,
  sender,
  responseTo,
  isRightSideResponder,
  time,
}) => (
  <MessageContainer isRightSideResponder={isRightSideResponder}>
    <MessageTextContainer>
      {responseTo && responseTo.text &&
        <Quotation>
          {responseTo.text}, from {responseTo.sender.username}
        </Quotation>
      }
      <MessageText>
        {text}
      </MessageText>
    </MessageTextContainer>
    <MessageDrawerHandle />
    <MessageDetails>
      {isRightSideResponder ? 'me' : sender.username}
      <time>{(new Date(time).toDateString())}</time>
    </MessageDetails>
  </MessageContainer>
);

Message.propTypes = {
  text: PropTypes.string.isRequired,
  sender: PropTypes.object.isRequired,
  time: PropTypes.number.isRequired,
  responseTo: PropTypes.object,
  isRightSideResponder: PropTypes.bool,
};

Message.defaultProps = {
  responseTo: {},
  isRightSideResponder: false,
};

export default Message;
