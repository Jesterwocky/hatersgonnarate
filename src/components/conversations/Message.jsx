import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, withTheme } from 'styled-components';

import MessageSenderInfo from './MessageSenderInfo';

import { MESSAGE_THEMES } from '../../util/themes';

const defaultTheme = MESSAGE_THEMES.seed;
const messagesMargin = 0;
const leftOrRightMargin = 6; // percent
const messageBorderRadius = 14;

const MessageContainer = styled.div.attrs({
  className: 'message',
})`
  font-size: 14px;
  display: flex;
  margin: 4% 0;
  flex-direction: ${props => (props.isRightSideResponder ? 'row-reverse' : 'row')};

  ${(props) => {
    const messagesRight = props.theme.messagesRight || defaultTheme.messagesRight;
    const messagesLeft = props.theme.messagesLeft || defaultTheme.messagesLeft;

    return props.isRightSideResponder ?
      css`
        color: ${messagesRight.color};
        margin-left: ${leftOrRightMargin}%;
      ` :
      css`
        color: ${messagesLeft.color};
        margin-right: ${leftOrRightMargin}%;
      `;
  }};
  `;

const MessageTextContainer = styled.div.attrs({
  className: 'message-textcontainer',
})`
  width: 100%;

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
        padding: 10px 14px 10px 10px;
        border-radius: ${messageBorderRadius}px;
        border-top-right-radius: 0;
      ` :
      css`
        background-color: ${messagesLeft.background};
        color: ${messagesLeft.color};
        padding: 10px 10px 10px 14px;
        border-radius: ${messageBorderRadius}px;
        border-top-left-radius: 0;
      `;
  }};
  `;

const MessageText = styled.div.attrs({
  className: 'message-text',
})``;

const Quotation = styled.div.attrs({
  className: 'message-text-quotation',
})`
  border-radius: ${messageBorderRadius}px;
  padding: 6px 11px;
  font-size: 11px;
  font-style: italic;
  margin: 0 10px 10px;
  border: 5px solid ${props => props.theme.messagesContainer.background || 'white'};

  ${(props) => {
    const messagesRight = props.theme.messagesRight || defaultTheme.messagesRight;
    const messagesLeft = props.theme.messagesLeft || defaultTheme.messagesLeft;

    return props.isRightSideResponder ?
      css`
        background-color: ${messagesLeft.background};
        color: ${messagesLeft.color};
        // margin: 0 0 10px 10px;
      ` :
      css`
        background-color: ${messagesRight.background};
        color: ${messagesRight.color};
        // margin: 0 10px 10px 0;
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

// right-side-responder: target in a callout, or current user in a group convo.
const Message = ({
  text,
  sender,
  responseTo,
  isRightSideResponder,
  includeSenderSummary,
  time,
}) => {
  const dateTime = new Date(time);

  return (
    <MessageContainer isRightSideResponder={isRightSideResponder}>
      {includeSenderSummary &&
        <MessageSenderInfo
          username={sender.username}
          userId={sender.id}
          rating={sender.ratingSnapshot.rating}
          picUrl={sender.profilePicUrl}
        />
      }
      <MessageTextContainer isRightSideResponder={isRightSideResponder}>
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
  includeSenderSummary: PropTypes.bool,
};

Message.defaultProps = {
  responseTo: {},
  isRightSideResponder: false,
  includeSenderSummary: false,
};

export default withTheme(Message);
