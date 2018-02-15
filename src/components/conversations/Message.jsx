import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { MESSAGE_THEMES } from '../../util/themes';

const defaultTheme = MESSAGE_THEMES.SEED;
const messagesMargin = 5;

const MessageContainer = styled.div.attrs({
  className: 'message',
})`
  font-size: 14px;
  padding: 7px;

  transition: box-shadow 0.15s ease-out;

  &:hover {
    // using box-shadow achieves outlining on hover
    // WITHOUT changing box size and
    // WITH border radius
    box-shadow: 0 0 0 2px ${props => (props.isRightSideResponder ?
    (props.theme.messagesRight || defaultTheme.messagesRight).borderHighlight :
    (props.theme.messagesLeft || defaultTheme.messagesLeft).borderHighlight)}
  }

  ${(props) => {
    const messagesRight = props.theme.messagesRight || defaultTheme.messagesRight;
    const messagesLeft = props.theme.messagesLeft || defaultTheme.messagesLeft;

    return props.isRightSideResponder ?
      css`
        background-color: ${messagesRight.background};
        color: ${messagesRight.color};
        margin: 0 0 ${messagesMargin}px ${messagesMargin}px;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      ` :
      css`
        background-color: ${messagesLeft.background};
        color: ${messagesLeft.color};
        margin: 0 ${messagesMargin}px ${messagesMargin}px 0;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
      `;
  } }`;

const MessageTextContainer = styled.div.attrs({
  className: 'message-textcontainer',
})``;

const MessageText = styled.div.attrs({
  className: 'message-text',
})``;

const Quotation = styled.div.attrs({
  className: 'message-text-quotation',
})`
  border-radius: 3px;
  border: ${messagesMargin}px solid white;
  padding: 6px 11px;
  font-size: 11px;
  font-style: italic;

  ${(props) => {
    const messagesRight = props.theme.messagesRight || defaultTheme.messagesRight;
    const messagesLeft = props.theme.messagesLeft || defaultTheme.messagesLeft;

    return props.isRightSideResponder ?
      css`
        background-color: ${messagesLeft.background};
        color: ${messagesLeft.color};
        margin: 5px 0 ${messagesMargin}px 10px;
      ` :
      css`
        background-color: ${messagesRight.background};
        color: ${messagesRight.color};
        margin: 5px 10px ${messagesMargin}px 0;
      `;
  } }`;

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
}) => {
  const dateTime = new Date(time);

  return (
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
        <time dateTime={dateTime}>{dateTime.toDateString()}</time>
      </MessageDetails>
    </MessageContainer>
  );
};

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
