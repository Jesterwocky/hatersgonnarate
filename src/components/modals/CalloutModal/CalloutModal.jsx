import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css, ThemeProvider } from 'styled-components';

import { isEmpty } from '../../../util/helpers';
import { MESSAGE_THEMES, CURTAIN_COLOR } from '../../../util/themes';

import { addMessageToConversation } from '../../../actions/conversations';

import Modal from '../Modal';
import SeedConvoOverleaf from './SeedConvo/SeedConvoOverleaf';
import SeedConvoThreadHeader from './SeedConvo/SeedConvoThreadHeader';
import InteractiveThread from '../../conversations/InteractiveThread';
import ThreadContainerWithOverleaves from '../../conversations/ThreadContainerWithOverleaves';

const convoTypes = {
  seed: 'seed',
  private: 'private',
  public: 'public',
};

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
  height: 39px;
  font-size: 16px;
  padding: 0 5px;

  background-color: ${CURTAIN_COLOR};
  color: white;
`;

export const Pane = styled.div.attrs({
  className: 'callout-panes-pane',
})`
  width: 100%;
  max-width: 420px;
  margin: 0 10px 0;
  border-radius: 5px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 0; // for response box in bottom right corner
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
      width: 25px;
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
  state = {
    seedConversationOpen: true,
    privateConversationOpen: true,
    publicConversationOpen: false,
  }

  createOnSubmitMessage = ({ convoId, threadType }) => (message) => {
    this.props.submitNewMessage({
      convoId,
      threadType,
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
    const { context, conversations } = this.props;
    const { seedConversationOpen, privateConversationOpen, publicConversationOpen } = this.state;
    const seedConvo = conversations.threads[convoTypes.seed];
    const privateConvo = conversations.threads[convoTypes.private];
    const publicConvo = conversations.threads[convoTypes.public];

    // TODO: secure way of hiding invitation-only convo ?
    return (
      <Modal>
        <CalloutModalContent>
          <CalloutModalHeading>
            Movie Name
          </CalloutModalHeading>
          <Panes>

            <ThemeProvider theme={MESSAGE_THEMES.seed}>
              <SeedConvoPane
                open={seedConversationOpen}
              >
                <ThreadHeading onClick={this.toggleSeedConvoPane}>
                  <SeedConvoThreadHeader
                    initiator={context.initiator}
                    target={context.target}
                    movieId={context.movieId}
                  />
                </ThreadHeading>

                <InteractiveThread
                  messages={seedConvo.messages}
                  target={context.target}
                  onSubmitMessage={this.createOnSubmitMessage({
                    convoId: context.conversationId || context.conversationId,
                    threadType: privateConvo.type || publicConvo.type,
                  })}
                  threadContainer={ThreadContainerWithOverleaves}
                  leftOverleaf={
                    <SeedConvoOverleaf
                      {...context.initiator}
                      movie={{
                        id: context.movieId,
                        movieName: 'Movie Name',
                      }}
                    />
                  }
                  rightOverleaf={
                    <SeedConvoOverleaf
                      {...context.target}
                      movie={{
                        id: context.movieId,
                        movieName: 'Movie Name',
                      }}
                    />
                  }
                />
              </SeedConvoPane>
            </ThemeProvider>

            {!isEmpty(privateConvo) &&
              <ThemeProvider theme={MESSAGE_THEMES.privateOrPublic}>
                <PrivateConvoPane
                  open={privateConversationOpen}
                >
                  <ThreadHeading
                    onClick={this.togglePrivateConvoPane}
                  >
                    Guests
                  </ThreadHeading>
                  <InteractiveThread
                    messages={privateConvo.messages}
                    includeSenderSummary
                    target={privateConvo.target}
                    onSubmitMessage={this.createOnSubmitMessage({
                      convoId: context.conversationId,
                      threadType: privateConvo.type,
                    })}
                  />
                </PrivateConvoPane>
              </ThemeProvider>
            }

            <ThemeProvider theme={MESSAGE_THEMES.privateOrPublic}>
              <PublicConvoPane
                open={publicConversationOpen}
              >
                <ThreadHeading
                  onClick={this.togglePublicConvoPane}
                >
                  Everyone
                </ThreadHeading>
                <InteractiveThread
                  messages={publicConvo.messages}
                  includeSenderSummary
                  target={publicConvo.target}
                  onSubmitMessage={this.createOnSubmitMessage({
                    convoId: context.conversationId,
                    threadType: publicConvo.type,
                  })}
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
  context: PropTypes.object.isRequired,
  conversations: PropTypes.object.isRequired,
  submitNewMessage: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    context: state.conversations.context,
    conversations: state.conversations.conversations[
      state.conversations.context.conversationId
    ],
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
