import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, withTheme, ThemeProvider } from 'styled-components';

import MessageSenderInfo from './MessageSenderInfo';

import { MESSAGE_THEMES } from '../../util/themes';
import { modalBannerZIndex } from '../../util/constants';

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
        // only use margin to indicate left vs right for seed convos,
        // since everyone but yourself is on the left side in a group convo
        ${!props.includeSenderSummary && `margin-left: ${leftOrRightMargin}%`};
      ` :
      css`
        color: ${messagesLeft.color};
        // only use margin to indicate left vs right for seed convos,
        // since everyone but yourself is on the left side in a group convo
        ${!props.includeSenderSummary && `margin-right: ${leftOrRightMargin}%`};
      `;
  }};
  `;

const MessageTextContainer = styled.div.attrs({
  className: 'message-textcontainer',
})`
  width: 100%;
  `;

const SingleSend = styled.div.attrs({
  className: 'message-singlesendcontainer',
})`
  padding: 5px 10px;
  border-radius: 0;

  transition: border-color 0.15s ease-out;

  :hover {
    z-index: ${modalBannerZIndex};
    cursor: pointer;

    border-color: ${props => (props.isRightSideResponder ?
    (props.theme.messagesRight || defaultTheme.messagesRight).borderHighlight :
    (props.theme.messagesLeft || defaultTheme.messagesLeft).borderHighlight)}
  }

  ${(props) => {
    const messagesRight = props.theme.messagesRight || defaultTheme.messagesRight;
    const messagesLeft = props.theme.messagesLeft || defaultTheme.messagesLeft;

    return props.isRightSideResponder ?
      css`
        background-color: ${messagesRight.background};
        border: 2px solid ${messagesRight.background};
        color: ${messagesRight.color};

        &:first-child {
          border-top-left-radius: ${messageBorderRadius}px;
        }
      ` :
      css`
        background-color: ${messagesLeft.background};
        border: 2px solid ${messagesLeft.background};
        color: ${messagesLeft.color};

        &:first-child {
          border-top-right-radius: ${messageBorderRadius}px;
        }
      `;
  }};

  :first-child {
    padding-top: 10px;
  }

  :last-child {
    padding-bottom: 10px;
    border-bottom-left-radius: ${messageBorderRadius}px;
    border-bottom-right-radius: ${messageBorderRadius}px;
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
      ` :
      css`
        background-color: ${messagesRight.background};
        color: ${messagesRight.color};
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
      <MessageContainer
        isRightSideResponder={isRightSideResponder}
        includeSenderSummary={includeSenderSummary}
      >
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
            <SingleSend
              key={`message-${message.id}`}
              isRightSideResponder={isRightSideResponder}
            >
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
