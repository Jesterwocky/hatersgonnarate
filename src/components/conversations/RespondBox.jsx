import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CURTAIN_COLOR, MESSAGE_THEMES } from '../../util/themes';

import { Button } from '../_StyledComponents';

import TextArea from '../TextArea';

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
  background-color: ${MESSAGE_THEMES.privateOrPublic.messagesContainer.background};
  display: flex;
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

  border: 2px solid red;
  border-radius: 0;
  border-bottom-right-radius: 4px;
`;

// TODO: expand textbox on click
const MessageBox = TextArea.extend.attrs({
  className: 'respond-box',
})`
  min-height: auto;
  height: 100%;
  width: auto;
  text-align: left;
  font-weight: 400;

  background-color: #f9f9f9;
  color: #504dad;
  border: 2px solid red;
  border-right: none;

  margin: 0;
  padding: 13px 10px 0 20px;

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

  submitMessage = () => {
    this.props.onSubmitMessage(this.state.messageText);

    // TODO: only clear text if it's saved sucessfully
    this.setState({
      messageText: '',
    });
  }

  render() {
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
          onClick={this.submitMessage}
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
