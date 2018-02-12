import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isEmpty } from '../../util/helpers';
import { SHAME_COLOR, SHAME_BACKGROUND } from '../../util/themes';

import Message from './Message';

const closedSideWidth = 20;
const openSideWidth = `calc(100% - ${closedSideWidth + 5}px)`;

const ConversationThreadWrapper = styled.div.attrs({
  className: 'thread',
})`
  height: 100%;
  position: relative;
  padding: 0 ${closedSideWidth}px;
`;

const Side = styled.div`
  position: absolute;
  height: 100%;
  top: 0;
  width: ${props => (props.open ? openSideWidth : `${closedSideWidth}px`)};
`;

const SideLeft = Side.extend.attrs({
  className: 'conversation-sideleft',
})`
  background-color: ${SHAME_COLOR};
  left: 0;
  top: 0;
  border-top-right-radius: ${props => (props.open ? '5px' : 0)};
  border-bottom-right-radius: ${props => (props.open ? '5px' : 0)};
`;

const SideRight = Side.extend.attrs({
  className: 'conversation-sideright',
})`
  background-color: ${SHAME_BACKGROUND};
  right: 0;
  border-top-left-radius: ${props => (props.open ? '5px' : 0)};
  border-bottom-left-radius: ${props => (props.open ? '5px' : 0)};
`;

const sides = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

// TODO: if message is responding to the message immediately preceding it,
// don't quote that message in the response even if the data is there

class ConversationThread extends Component {
  state = {
    sideInfoOpen: null,
  }

  toggleLeftSide = () => {
    const sideState = this.state.sideInfoOpen === sides.LEFT ?
      null : sides.LEFT;

    this.setState({
      sideInfoOpen: sideState,
    });
  }

  toggleRightSide = () => {
    const sideState = this.state.sideInfoOpen === sides.RIGHT ?
      null : sides.RIGHT;

    this.setState({
      sideInfoOpen: sideState,
    });
  }

  render() {
    const {
      messages,
      movieId,
      user,
      target,
    } = this.props;

    // make sure conversation is in order
    const messageList = Object.keys(messages)
      .sort().map(key => messages[key]);

    return (
      <ConversationThreadWrapper>
        <SideLeft
          onClick={this.toggleLeftSide}
          open={this.state.sideInfoOpen === sides.LEFT}
        />
        <SideRight
          onClick={this.toggleRightSide}
          open={this.state.sideInfoOpen === sides.RIGHT}
        />
        {messageList.map(message => (
          <Message
            key={`message-${message.id}`}
            isRightSideResponder={
              isEmpty(target) ?
              message.sender.id === user.id :
              message.sender.id === target.id
            }
            {...message}
            >
            {message.text}
          </Message>
        ))}
      </ConversationThreadWrapper>
    );
  };
}

ConversationThread.propTypes = {
  messages: PropTypes.object.isRequired,
  movieId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  target: PropTypes.object,
};

ConversationThread.defaultProps = {
  target: {},
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(ConversationThread);
