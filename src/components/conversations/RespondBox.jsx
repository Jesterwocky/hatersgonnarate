import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LIGHT } from '../../util/themes';

import { Button } from '../_StyledComponents';

import TextArea from '../TextArea';

const RespondContainer = styled.div.attrs({
  className: 'messagebox',
})`
  width: 100%;
  height: 40px;
  display: flex;
  margin-top: 5px;
`;

const ResponseContainer = styled.div.attrs({
  className: 'messagebox-response',
})`
  width: 100%;
`;

const MessageBox = TextArea.extend.attrs({
  className: 'messagebox-box',
})``;

const RespondButtonContainer = styled.div.attrs({
  className: 'messagebox-respondbuttoncontainer',
})``;

const RespondButton = Button.extend.attrs({
  className: 'messagebox-respondbuttoncontainer',
})`
  height: 100%;
  padding: 0 3px;
  font-size: 11px;
  margin: 0 0 0 5px;
  border-radius: 0;
  border-bottom-right-radius: 4px;
`;

const GoToRespondButton = Button.extend.attrs({
  className: 'messagebox-respond',
})`
  height: 100%;
  width: 100%;
  text-align: left;
  font-weight: 300;
  padding: 0 10px;
  background-color: #f9f9f9;
  color: #d3d3ff;
  border: 2px solid #efeff7;
  border-radius: 0;
  border-bottom-left-radius: 4px;
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
      mustRespondElsewhere,
      activateOtherMessageBox,
      submitMessage,
    } = this.props;

    return (
      <RespondContainer>
        <ResponseContainer>
          {mustRespondElsewhere &&
            <GoToRespondButton
              onClick={activateOtherMessageBox}
            >
              Respond
            </GoToRespondButton>
          }
          {!mustRespondElsewhere &&
            <MessageBox
              onChange={this.updateMessageText}
              value={this.state.messageText}
              placeholder="Respond"
            />
          }
        </ResponseContainer>

        <RespondButtonContainer>
          <RespondButton
            onClick={submitMessage}
            disabled={!this.state.messageText || mustRespondElsewhere}
          >
            Post
          </RespondButton>
        </RespondButtonContainer>
      </RespondContainer>
    );
  }
}

RespondBox.propTypes = {
  activateOtherMessageBox: PropTypes.func,
  mustRespondElsewhere: PropTypes.bool,
  submitMessage: PropTypes.func,
};

RespondBox.defaultProps = {
  activateOtherMessageBox: null,
  mustRespondElsewhere: null,
  submitMessage: null,
};

export default RespondBox;
