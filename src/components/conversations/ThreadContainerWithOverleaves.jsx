import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css, withTheme, ThemeProvider } from 'styled-components';

import { modalZIndex, modalBannerZIndex } from '../../util/constants';
import { MESSAGE_THEMES } from '../../util/themes';

// Purpose of ThreadContainerWithOverleaves: a container div for a conversation
// that adds a clickable bar on the left and right side of the conversation,
// corresponding with the left and right side participants. Clicking the
// bar opens the overleaf, which is intended to display info about the
// participant on that side.

const defaultTheme = MESSAGE_THEMES.SEED;
const contentBorderRadius = '50'; // px

const overleaves = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

// percent
const messagesPadding = 4; // percent
const closedOverleafWidth = 8; // percent
const distanceFromSideToContent = 6; // percent
const openOverleafWidth = 100 - distanceFromSideToContent; // percent

// px
const bufferBorderWidth = 4; // px

// Container for the conversation contents. Used to position overleaves to
// left and right
const ThreadContainerWithOverleavesWrapper = styled.div.attrs({
  className: 'overleaves',
})`
  height: 100%;
  position: relative;
  padding: 0 ${closedOverleafWidth + messagesPadding}%;
  overflow: hidden;
  background: ${props => (props.theme.messagesContainer || {}).background || 'black'};
`;

const Overleaf = styled.div`
  font-size: 13px;

  height: 100%;
  width: ${openOverleafWidth}%;

  z-index: ${modalZIndex};
  position: absolute;
  top: 0;

  ${props => props.open &&
    css`
      background-color: ${(props.theme.messagesContainer || defaultTheme.messagesContainer).background};
      z-index: ${modalBannerZIndex};
    `}
  `;

const LeftOverleaf = Overleaf.extend.attrs({
  className: 'overleaves-overleaf-left',
})`
  background-color: ${props => (props.theme.messagesLeft || defaultTheme.messagesLeft).background};
  color: ${props => (props.theme.messagesLeft || defaultTheme.messagesLeft).color};
  border-top-right-radius: ${contentBorderRadius}px;
  border-bottom-right-radius: ${contentBorderRadius}px;
  left: -${openOverleafWidth - closedOverleafWidth}%;

  transition: left 0.1s;

  ${props => props.open &&
    css`
      left: 0;
      border-right: ${bufferBorderWidth}px solid ${(props.theme.messagesContainer || defaultTheme.messagesContainer).background};
    `}
`;

const RightOverleaf = Overleaf.extend.attrs({
  className: 'overleaves-overleafright',
})`
  background-color: ${props => (props.theme.messagesRight || defaultTheme.messagesRight).background};
  color: ${props => (props.theme.messagesLeft || defaultTheme.messagesLeft).color};
  border-top-left-radius: ${contentBorderRadius}px;
  border-bottom-left-radius: ${contentBorderRadius}px;
  right: -${openOverleafWidth - closedOverleafWidth}%;

  transition: right 0.1s;

  ${props => props.open &&
    css`
      right: 0;
      border-left: ${bufferBorderWidth}px solid ${(props.theme.messagesContainer || defaultTheme.messagesContainer).background};
    `}
`;

// when an overleaf is open, the overleaf changes to white (or whatever
// background / buffer color) and then the content goes on top and takes
// on the main overleaf color. Overleaf content is only visible when overleaf
// state = open. Allows the contents to have rounded corners over a
// white / neutral background
const OverleafContent = styled.div`
  padding: 20px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
`;

const LeftContent = OverleafContent.extend.attrs({
  className: 'overleaves-overleafcontent-left',
})`
  background-color: ${props => (props.theme.messagesLeft || defaultTheme.messagesLeft).background};
  color: ${props => (props.theme.messagesLeft || defaultTheme.messagesLeft).color};
  border-top-right-radius: ${contentBorderRadius}px;
  border-bottom-right-radius: ${contentBorderRadius}px;
`;

const RightContent = OverleafContent.extend.attrs({
  className: 'overleaves-overleafcontent-left',
})`
  background-color: ${props => (props.theme.messagesRight || defaultTheme.messagesRight).background};
  color: ${props => (props.theme.messagesRight || defaultTheme.messagesRight).color};
  border-top-left-radius: ${contentBorderRadius}px;
  border-bottom-left-radius: ${contentBorderRadius}px;
`;

class ThreadContainerWithOverleaves extends Component {
  state = {
    overleafOpen: null,
  }

  toggleLeftOverleaf = () => {
    const overleafState = this.state.overleafOpen === overleaves.LEFT ?
      null : overleaves.LEFT;

    this.setState({
      overleafOpen: overleafState,
    });
  }

  toggleRightOverleaf = () => {
    const overleafState = this.state.overleafOpen === overleaves.RIGHT ?
      null : overleaves.RIGHT;

    this.setState({
      overleafOpen: overleafState,
    });
  }

  render() {
    const {
      children,
      leftOverleaf,
      rightOverleaf,
      theme,
    } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <ThreadContainerWithOverleavesWrapper>
          <LeftOverleaf
            onClick={this.toggleLeftOverleaf}
            open={this.state.overleafOpen === overleaves.LEFT}
          >
            {this.state.overleafOpen === overleaves.LEFT &&
              <LeftContent>
                {leftOverleaf}
              </LeftContent>
            }
          </LeftOverleaf>

          <RightOverleaf
            onClick={this.toggleRightOverleaf}
            open={this.state.overleafOpen === overleaves.RIGHT}
          >
            {this.state.overleafOpen === overleaves.RIGHT &&
              <RightContent>
                {rightOverleaf}
              </RightContent>
            }
          </RightOverleaf>

          {children}
        </ThreadContainerWithOverleavesWrapper>
      </ThemeProvider>
    );
  }
}

ThreadContainerWithOverleaves.propTypes = {
  children: PropTypes.node,
  leftOverleaf: PropTypes.node,
  rightOverleaf: PropTypes.node,
  theme: PropTypes.object,
};

ThreadContainerWithOverleaves.defaultProps = {
  children: null,
  leftOverleaf: null,
  rightOverleaf: null,
  theme: {},
};

export default withTheme(ThreadContainerWithOverleaves);
