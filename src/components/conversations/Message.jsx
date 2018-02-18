import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, withTheme, ThemeProvider } from 'styled-components';

import MessageSenderInfo from './MessageSenderInfo';

import { MESSAGE_THEMES } from '../../util/themes';

const defaultTheme = MESSAGE_THEMES.seed;
const leftOrRightMargin = 6; // percent
const messageBorderRadius = 14;

const MessageContainer = styled.div.attrs({
  className: 'message',
})`
  font-size: 14px;
  display: flex;
  flex-direction: ${props => (props.isRightSideResponder ? 'row-reverse' : 'row')};
  margin-bottom: 4%;

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

const SingleSend = styled.div.attrs({
  className: 'message-singlesendcontainer',
})`
  padding-bottom: 8px;

  :last-child {
    padding-bottom: 0;
  }
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

const Author = styled.div.attrs({
  className: 'message-text-quotation-author',
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

// right-side-responder: target in a callout, or current user in a group convo.
const Message = ({
  messageGroup,
  sender,
  isRightSideResponder,
  includeSenderSummary,
  theme,
}) => {
  return (
    <ThemeProvider theme={theme}>
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
          {messageGroup.map(message => (
            <SingleSend key={`message-${message.id}`}>
              {message.responseTo && message.responseTo.text &&
                <Quotation>
                  {message.responseTo.text}
                  <Author>{message.responseTo.sender.username}</Author>
                </Quotation>
              }
              <MessageText>
                {message.text}
              </MessageText>
            </SingleSend>
          ))}
        </MessageTextContainer>

        <MessageDrawerHandle />
        <MessageDetails>
          {isRightSideResponder ? 'me' : sender.username}
        </MessageDetails>
      </MessageContainer>
    </ThemeProvider>
  );
};

Message.propTypes = {
  messageGroup: PropTypes.array.isRequired,
  sender: PropTypes.object.isRequired,
  isRightSideResponder: PropTypes.bool,
  includeSenderSummary: PropTypes.bool,
  theme: PropTypes.object,
};

Message.defaultProps = {
  isRightSideResponder: false,
  includeSenderSummary: false,
  theme: {},
};

export default withTheme(Message);
