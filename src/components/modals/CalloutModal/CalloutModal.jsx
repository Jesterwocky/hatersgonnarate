import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css, ThemeProvider } from 'styled-components';

import { isEmpty } from '../../../util/helpers';
import { MESSAGE_THEMES, CURTAIN_COLOR } from '../../../util/themes';

import { addMessageToConversation } from '../../../actions/conversations';

import Modal from '../Modal';
import SeedConvoContainer from './SeedConvo/SeedConvoContainer';
import SeedConvoThreadHeader from './SeedConvo/SeedConvoThreadHeader';
import InteractiveThreadContainer from '../../conversations/InteractiveThreadContainer';

const convoTypes = {
  seed: 'seed',
  private: 'private',
  public: 'public',
};

const headerHeight = 39; // px

const CalloutModalContent = styled.div.attrs({
  className: 'calloutmodal-content',
})`
  min-height: 400px;
  height: 70vh;
  display: flex;
  flex-direction: column;
`;
const CalloutModalHeading = styled.h1.attrs({
  className: 'calloutmodal-heading',
})`
  width: 100%;
  font-size: 26px;
  margin: 0 0 5px;
  color: ${CURTAIN_COLOR};
`;

const Panes = styled.div.attrs({
  className: 'callout-panes',
})`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const ThreadHeading = styled.div.attrs({
  className: 'calloutmodal-thread-heading',
})`
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  height: ${headerHeight}px;
  font-size: 16px;

  background-color: ${CURTAIN_COLOR};
  color: white;
`;

export const Pane = styled.div.attrs({
  className: 'callout-panes-pane',
})`
  width: 100%;
  max-width: 340px;
  margin: 0 10px 0;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  overflow: hidden;

  // allows 100% height on conversation to fill available space
  // instead of being 100% height including header
  display: flex;
  flex-direction: column;

  &:first-child,
  &:last-child {
    margin: 0;
  }

  ${props => !props.open && css`
      display: none;
  `}
`;

const SeedConvoPane = Pane.extend.attrs({
  className: 'calloutmodal-panes-pane-seedpane',
})``;

const PrivateConvoPane = Pane.extend.attrs({
  className: 'calloutmodal-panes-pane-private',
})``;

const PublicConvoPane = Pane.extend.attrs({
  className: 'calloutmodal-panes-pane-public',
})``;


class CalloutModal extends Component {
  constructor(props) {
    super(props);
    const { privateConvo } = this.props;

    this.state = {
      seedConversationOpen: true,
      privateConversationOpen:
        privateConvo &&
        privateConvo.participants &&
        privateConvo.participants[this.props.user.id],
      publicConversationOpen: false,
    };
  }

  onSubmitSeedMessage = (message) => {
    const { context, privateConvo, publicConvo } = this.props;

    // response will go to the private convo (preferentially) or public convo,
    // so need to open that pane if it isn't already open.
    const threadType = privateConvo.type || publicConvo.type;

    this.props.submitNewMessage({
      convoId: context.conversationId,
      threadType,
      message,
    });

    if (threadType === convoTypes.private && !this.state.privateConversationOpen) {
      this.togglePrivateConvoPane();
    } else if (threadType === convoTypes.public && !this.state.publicConversationOpen) {
      this.togglePublicConvoPane();
    }
  }

  onSubmitPublicMessage = (message) => {
    const { context, publicConvo } = this.props;

    this.props.submitNewMessage({
      convoId: context.conversationId,
      threadType: publicConvo.type,
      message,
    });
  }

  onSubmitPrivateMessage = (message) => {
    const { context, privateConvo } = this.props;

    this.props.submitNewMessage({
      convoId: context.conversationId,
      threadType: privateConvo.type,
      message,
    });
  }

  toggleSeedConvoPane = () => {
    this.setState({
      seedConversationOpen: !this.state.seedConversationOpen,
    });
  }

  toggleSeedConvoPane = () => {
    this.setState({
      seedConversationOpen: !this.state.seedConversationOpen,
    });
  }

  togglePrivateConvoPane = () => {
    this.setState({
      privateConversationOpen: !this.state.privateConversationOpen,
    });
  }

  togglePublicConvoPane = () => {
    this.setState({
      publicConversationOpen: !this.state.publicConversationOpen,
    });
  }

  render() {
    const {
      context,
      seedConvo,
      privateConvo,
      publicConvo,
    } = this.props;

    const { seedConversationOpen, privateConversationOpen, publicConversationOpen } = this.state;

    // if user wasn't invited to private convo, backend should not return it.
    return (
      <Modal>
        <CalloutModalContent>
          <CalloutModalHeading>
            Movie Name
          </CalloutModalHeading>
          <Panes>

            <ThemeProvider theme={{ ...MESSAGE_THEMES.seed, headerHeight }}>
              <SeedConvoPane open={seedConversationOpen} >
                <ThreadHeading onClick={this.toggleSeedConvoPane}>
                  <SeedConvoThreadHeader
                    initiator={context.initiator}
                    target={context.target}
                    movieId={context.movie.id}
                  />
                </ThreadHeading>

                <InteractiveThreadContainer
                  informationalMessageContainer={SeedConvoContainer}
                  messages={seedConvo.messages}
                  onSubmitMessage={this.onSubmitSeedMessage}
                  canRespond={
                    !this.state.privateConversationOpen &&
                    !this.state.publicConversationOpen
                  }
                  {...context}
                />
              </SeedConvoPane>
            </ThemeProvider>

            {!isEmpty(privateConvo) &&
              <ThemeProvider theme={MESSAGE_THEMES.privateOrPublic}>
                <PrivateConvoPane open={privateConversationOpen} >
                  <ThreadHeading onClick={this.togglePrivateConvoPane} >
                    Guests
                  </ThreadHeading>

                  <InteractiveThreadContainer
                    messages={privateConvo.messages}
                    onSubmitMessage={this.onSubmitPrivateMessage}
                    canRespond
                  />

                </PrivateConvoPane>
              </ThemeProvider>
            }

            <ThemeProvider theme={MESSAGE_THEMES.privateOrPublic}>
              <PublicConvoPane open={publicConversationOpen} >
                <ThreadHeading onClick={this.togglePublicConvoPane} >
                  Everyone
                </ThreadHeading>

                <InteractiveThreadContainer
                  messages={publicConvo.messages}
                  onSubmitMessage={this.onSubmitPublicMessage}
                  canRespond
                />

              </PublicConvoPane>
            </ThemeProvider>
          </Panes>
        </CalloutModalContent>
      </Modal>
    );
  }
}

CalloutModal.propTypes = {
  user: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  seedConvo: PropTypes.object.isRequired,
  privateConvo: PropTypes.object,
  publicConvo: PropTypes.object.isRequired,
  submitNewMessage: PropTypes.func.isRequired,
};

CalloutModal.defaultProps = {
  privateConvo: null,
};

function mapStateToProps(state) {
  const conversation = state.conversations.conversations[
    state.conversations.context.conversationId
  ];

  return {
    user: state.user,
    context: state.conversations.context,
    seedConvo: conversation.threads[convoTypes.seed],
    privateConvo: conversation.threads[convoTypes.private],
    publicConvo: conversation.threads[convoTypes.public],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitNewMessage: ({ convoId, threadType, message }) => {
      addMessageToConversation(
        dispatch,
        convoId,
        threadType,
        message,
      );
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalloutModal);
