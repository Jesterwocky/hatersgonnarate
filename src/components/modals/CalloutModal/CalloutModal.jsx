import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import { SHAME_COLOR, SHAME_BACKGROUND } from '../../../util/themes';

import Modal from '../Modal';
import PersonSummary from '../../conversations/PersonSummary';
import ConversationThread from '../../conversations/ConversationThread';
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

const ThreadHeading = styled.div.attrs({
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

const VsText = styled.p.attrs({
  className: 'calloutmodal-conversation-vstext',
})`
  font-weight: 300;
  font-size: 12px;
  margin: 0 7px;
  padding-top: 5px;
`;

const PersonSummaryContainer = styled.div`
  width: 100%;
  display: flex;
`;

const InitiatorSummary = PersonSummaryContainer.extend.attrs({
  className: 'calloutmodal-personsummarycontainer',
})`
  justify-content: flex-end;
`;

const ResponderSummary = PersonSummaryContainer.extend.attrs({
  className: 'calloutmodal-personsummarycontainer',
})`
  justify-content: flex-start;
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

const Pane = styled.div.attrs({
  className: 'callout-panes-pane',
})`
  width: 100%;
  margin: 0 5px 0;
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

const SeedConvo = Pane.extend.attrs({
  className: 'callout-panes-seedconvo',
})``;

const PrivateConvo = Pane.extend.attrs({
  className: 'callout-panes-seedconvo',
})``;

const PublicConvo = Pane.extend.attrs({
  className: 'callout-panes-seedconvo',
})``;

const Overleaf = styled.div.attrs({
  className: 'callout-conversation-overleaf',
})``;

class CalloutModal extends Component {
  state = {
    seedConversationOpen: true,
    privateConversationOpen: false,
    publicConversationOpen: false,
  }

  render() {
    const { context, conversations, user } = this.props;
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

            <ThemeProvider theme={{}}>
              <SeedConvo>
                <ThreadHeading>
                  <InitiatorSummary>
                    <PersonSummary
                      userId={context.initiator.id}
                      username={context.initiator.username}
                      rating={context.initiator.ratingSnapshot.rating}
                      movieId={context.movieId}
                    />
                  </InitiatorSummary>

                  <VsText>@</VsText>

                  <ResponderSummary>
                    <PersonSummary
                      userId={context.target.id}
                      username={context.target.username}
                      rating={context.target.ratingSnapshot.rating}
                      movieId={context.movieId}
                    />
                  </ResponderSummary>
                </ThreadHeading>

                <ThreadContainerWithOverleaves
                  leftOverleaf={
                    <Overleaf>
                      This right here is some info
                    </Overleaf>
                  }
                  rightOverleaf={
                    <Overleaf>
                      This right here is some info
                    </Overleaf>
                  }
                >
                  <ConversationThread
                    messages={seedConvo.messages}
                    movieId={context.movieId}
                    target={context.target}
                  />
                </ThreadContainerWithOverleaves>
              </SeedConvo>
            </ThemeProvider>

            <PrivateConvo>
              <ThreadHeading>
                Just us raters
              </ThreadHeading>
            </PrivateConvo>

            <PublicConvo>
              <ThreadHeading>
                Town Square
              </ThreadHeading>
            </PublicConvo>
          </Panes>
        </CalloutModalContent>
      </Modal>
    );
  }
}

CalloutModal.propTypes = {
  context: PropTypes.object.isRequired,
  conversations: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    context: state.conversations.context,
    conversations: state.conversations.conversations[
      state.conversations.context.conversationId
    ],
    user: state.user,
  };
}

export default connect(mapStateToProps)(CalloutModal);
