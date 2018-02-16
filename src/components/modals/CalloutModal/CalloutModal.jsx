import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import { isEmpty } from '../../../util/helpers';
import { SHAME_COLOR } from '../../../util/themes';

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
  color: ${SHAME_COLOR};
`;

const Panes = styled.div.attrs({
  className: 'callout-panes',
})`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  color: ${SHAME_COLOR};
`;

export const ThreadHeading = styled.div.attrs({
  className: 'calloutmodal-thread-heading',
})`
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  height: 33px;
  font-size: 16px;
  padding: 0 5px;

  background-color: ${SHAME_COLOR};
  color: white;
`;

export const Pane = styled.div.attrs({
  className: 'callout-panes-pane',
})`
  width: 100%;
  margin: 0 10px 0;
  border-radius: 4px;
  overflow: hidden;

  // allows 100% height on conversation to fill available space
  // instead of being 100% height including header
  display: flex;
  flex-direction: column;

  &:first-child,
  &:last-child {
    margin: 0;
  }
`;

const SeedConvoPane = Pane.extend.attrs({
  className: 'calloutmodal-panes-seedpane',
})``;

const PrivateConvoPane = Pane.extend.attrs({
  className: 'calloutmodal-panes-seedpane',
})``;

const PublicConvoPane = Pane.extend.attrs({
  className: 'calloutmodal-panes-seedpane',
})``;

class CalloutModal extends Component {
  state = {
    seedConversationOpen: true,
    privateConversationOpen: false,
    publicConversationOpen: false,
  }

  createOnSubmitMessage = ({ convoId, threadType }) => message => (
    this.props.submitNewMessage({
      convoId,
      threadType,
      message,
    })
  )

  render() {
    const { context, conversations } = this.props;
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

            <SeedConvoPane>
              <ThreadHeading>
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
                  convoId: privateConvo.id || publicConvo.id,
                  threadType: privateConvo.type || publicConvo.type,
                })}
                threadContainer={ThreadContainerWithOverleaves}
                leftOverLeaf={
                  <SeedConvoOverleaf
                    {...context.initiator}
                    movie={{
                      id: context.movieId,
                      movieName: 'Movie Name',
                    }}
                  />
                }
                rightOverLeaf={
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

            {!isEmpty(privateConvo) &&
              <PrivateConvoPane>
                <ThreadHeading>
                  Guests
                </ThreadHeading>
                <InteractiveThread
                  messages={privateConvo.messages}
                  target={privateConvo.target}
                  onSubmitMessage={this.createOnSubmitMessage({
                    convoId: privateConvo.id,
                    threadType: privateConvo.type,
                  })}
                />
              </PrivateConvoPane>
            }

            <PublicConvoPane>
              <ThreadHeading>
                Everyone
              </ThreadHeading>
              <InteractiveThread
                messages={publicConvo.messages}
                target={publicConvo.target}
                onSubmitMessage={this.createOnSubmitMessage({
                  convoId: publicConvo.id,
                  threadType: publicConvo.type,
                })}
              />
            </PublicConvoPane>
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
