import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme, ThemeProvider } from 'styled-components';

import ThreadMessages from './ThreadMessages';
import RespondBox from './RespondBox';

// TODO: make this easier to change? Or make a limited amount of
// space available, and then if additional space is needed (long response)
// just expand the box upward, covering the covnersation, as long as the
// respond box is selected
const respondBoxHeight = '50px';

const ThreadContainer = styled.div.attrs({
  className: 'interactivethread',
})`
  display: flex;
  flex-direction: column;
  height: 100%;
  // border-bottom-left-radius: 40px;
  // border-bottom-right-radius: 40px;
  position: relative;
`;

const MessagesContainer = styled.div.attrs({
  className: 'interactivethread-messages-container',
})`
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  overflow: hidden;
  height: 100%;
  padding-bottom: ${props => (props.hasRespondBox ? respondBoxHeight : '0')};
  background-color: ${props => (props.theme.messagesContainer || {}).background || 'black'};
`;

const ResponseContainer = styled.div.attrs({
  className: 'interactivethread-responsecontainer',
})`
  // position relative to bottom of container to keep on top
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
`;

// NB: this component was created as a Higher Order Component to deal with the
// common problem of keeping track of quoted text when the user clicks a message
// to respond to it, when conversations will sometimes require an additional
// wrapper with more info about the conversation (informationalMessageContainer)

// TODO: figure out: is it wise to pass through all the props to the container
// element? It allows extra props to be passed through without this component
// having to worry about them, but means all the other props that the container
// won't use will get through as well. Not sure how to weight these considerations

class InteractiveThreadContainer extends Component {
  state = {
    quotedForResponse: null,
  }

  updateQuotedForResponse({ message, author }) {
    this.setState({
      quotedForResponse: {
        message,
        author,
      },
    });
  }

  render() {
    const {
      messages,
      informationalMessageContainer,
      onSubmitMessage,
      canRespond,
      targetUser, // TODO: isn't obvious how this will be used. Name change?
      theme,
    } = this.props;

    const MessagesContainer2 = informationalMessageContainer;

    return (
      <ThemeProvider theme={theme}>
        <ThreadContainer>
          <MessagesContainer theme={theme} hasRespondBox={canRespond}>

            {MessagesContainer2 &&
              <MessagesContainer2 {...this.props}>
                <ThreadMessages
                  messages={messages}
                  targetUser={targetUser}
                  onClickMessage={this.updateQuotedForResponse}
                />
              </MessagesContainer2>
            }

            {!MessagesContainer2 &&
              <ThreadMessages
                messages={messages}
                targetUser={targetUser}
                onClickMessage={this.updateQuotedForResponse}
              />
            }

          </MessagesContainer>

          {canRespond &&
            <ResponseContainer height={respondBoxHeight}>
              <RespondBox
                onSubmitMessage={onSubmitMessage}
                quotation={this.state.quotedForResponse}
              />
            </ResponseContainer>
          }

        </ThreadContainer>
      </ThemeProvider>
    );
  }
}

InteractiveThreadContainer.propTypes = {
  messages: PropTypes.node,
  informationalMessageContainer: PropTypes.node,
  onSubmitMessage: PropTypes.func.isRequired,
  canRespond: PropTypes.bool,
  quotation: PropTypes.object,
  targetUser: PropTypes.object,
  theme: PropTypes.object,
};

InteractiveThreadContainer.defaultProps = {
  messages: null,
  informationalMessageContainer: null,
  canRespond: false,
  quotation: null,
  targetUser: null,
  theme: {},
};

export default withTheme(InteractiveThreadContainer);
