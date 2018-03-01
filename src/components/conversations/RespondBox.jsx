import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CURTAIN_COLOR } from '../../util/themes';

import { Button } from '../_StyledComponents';

import TextArea from '../TextArea';

const RespondContainer = styled.div.attrs({
  className: 'respond',
})`
  width: 100%;
  height: ${props => props.height};
  display: flex;
  border: none;
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

const MessageBoxContainer = styled.div.attrs({
  className: 'respond-messageboxcontainer',
})`
  width: 100%;
  margin: 0;
  display: flex;

  height: 100%;
  width: auto;
  text-align: left;
  font-weight: 400;

  background-color: #f9f9f9;
  color: #504dad;
  border: 2px solid red;
  border-right: none;

  border-radius: 0;
  border-top-left-radius: 20px;
  margin-left: 43px;

  overflow: hidden;
`;

const QuotationBox = styled.div.attrs({
  className: 'respond-quotation',
})`
  height: auto;
`;

const QuotationText = styled.div.attrs({
  className: 'respond-quotation-text',
})``;

const QuotationAuthor = styled.div.attrs({
  className: 'respond-quotation-author',
})``;

// TODO: expand textbox on click
const MessageBox = TextArea.extend.attrs({
  className: 'respond-box',
})`
  min-height: auto;
  text-align: left;
  font-weight: 400;
  background-color: #f9f9f9;
  color: #504dad;
  margin: 0;
  padding: 13px 10px 0 20px;

  // height: 100%;
  // width: auto;
  // border: 2px solid red;
  // border-right: none;

  // border-radius: 0;
  // border-top-left-radius: 20px;
  // margin-left: 43px;
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
    const { quotation } = this.props;

    return (
      <RespondContainer height={this.props.height}>
        <MessageBoxContainer>
          {quotation &&
            <QuotationBox>
              <QuotationText>
                {quotation.text}
              </QuotationText>
              <QuotationAuthor>
                {quotation.author}
              </QuotationAuthor>
            </QuotationBox>
          }

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
  height: PropTypes.string,
  quotation: PropTypes.shape({
    text: PropTypes.string,
    author: PropTypes.string,
  }),
};

RespondBox.defaultProps = {
  onSubmitMessage: null,
  height: '50px',
  quotation: null,
};

export default RespondBox;
