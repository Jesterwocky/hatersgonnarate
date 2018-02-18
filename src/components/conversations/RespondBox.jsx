import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CURTAIN_COLOR, MESSAGE_THEMES } from '../../util/themes';

import { Button } from '../_StyledComponents';

import TextBox from '../TextBox';

const RespondContainer = styled.div.attrs({
  className: 'respond',
})`
  width: 100%;
  height: 50px;
  display: flex;
  border: none;
`;

const MessageBoxContainer = styled.div.attrs({
  className: 'respond-messageboxcontainer',
})`
  width: 100%;
  margin: 0;
  background-color: ${MESSAGE_THEMES.privateOrPublic.messagesContainer.background}
`;

const PostMessageButton = Button.extend.attrs({
  className: 'respond-respondbuttoncontainer',
})`
  height: 100%;
  font-size: 11px;
  color: white;
  background-color: ${CURTAIN_COLOR};

  padding: 0 20px;
  margin: 0;

  border: none;
  border-radius: 0;
  border-bottom-right-radius: 4px;
`;

const MessageBox = TextBox.extend.attrs({
  className: 'respond-box',
})`
  min-height: auto;
  height: 100%;
  width: 100%;
  text-align: left;
  font-weight: 400;

  background-color: #f9f9f9;
  color: #504dad;

  margin: 0;
  padding: 3px 10px 0 20px;

  // border: 2px solid ${CURTAIN_COLOR};
  // border-radius: 0;
  // border-bottom-left-radius: 4px;
  // border-right: none;
  // border-top: none;

  border-radius: 0;
  border-top-left-radius: 20px;
  margin-left: 43px;
`;

class RespondBox extends Component {
  state = {
    messageText: '',
  }

  updateMessageText = (messageText) => {
    this.setState({
      messageText,
    });
  }

  render() {
    const {
      onSubmitMessage,
    } = this.props;

    // TODO: enable submit on hitting return?
    return (
      <RespondContainer>
        <MessageBoxContainer>
          <MessageBox
            onUpdateText={this.updateMessageText}
            value={this.state.messageText}
            placeholder="Respond"
          />
        </MessageBoxContainer>

        <PostMessageButton
          onClick={onSubmitMessage}
          disabled={!this.state.messageText}
        >
          Post
        </PostMessageButton>

      </RespondContainer>
    );
  }
}

RespondBox.propTypes = {
  onSubmitMessage: PropTypes.func,
};

RespondBox.defaultProps = {
  onSubmitMessage: null,
};

export default RespondBox;
