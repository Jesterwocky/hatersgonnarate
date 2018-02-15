import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { modalContentZIndex, modalBannerZIndex } from '../../util/constants';
import { MESSAGE_THEMES } from '../../util/themes';

// Purpose of ThreadContainerWithOverleaves: a container div for a conversation
// that adds a clickable bar on the left and right side of the conversation,
// corresponding with the left and right side participants. Clicking the
// bar opens the overleaf, which is intended to display info about the
// participant on that side.

const defaultTheme = MESSAGE_THEMES.SEED;

const overleaves = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

const closedOverleafWidth = 8; // percent
const bufferBorderWidth = 4; // px
const distanceFromSideToContent = 6; // percent
const openOverleafWidth = 100 - distanceFromSideToContent; // percent

// Container for the conversation contents. Used to position overleaves to
// left and right
const ThreadContainerWithOverleavesWrapper = styled.div.attrs({
  className: 'overleaves-wrapper',
})`
  height: 100%;
  position: relative;
  padding: 0 ${closedOverleafWidth}%;
  margin-top: 5px;
  overflow: hidden;
`;

const Overleaf = styled.div`
  font-size: 13px;

  height: 100%;
  width: ${openOverleafWidth}%;

  z-index: ${modalContentZIndex};
  position: absolute;
  top: 0;

  ${props => props.open &&
    css`
      z-index: ${modalBannerZIndex};
    `}
  `;

const LeftOverleaf = Overleaf.extend.attrs({
  className: 'overleaves-wrapper-overleaf-left',
})`
  background-color: ${props => (props.theme.messagesLeft || defaultTheme.messagesLeft).background};
  color: ${props => (props.theme.messagesLeft || defaultTheme.messagesLeft).color};
  left: -${openOverleafWidth - closedOverleafWidth}%;

  transition: left 0.2s;

  ${props => props.open &&
    css`
      left: 0;
      border-right: ${bufferBorderWidth}px solid white;
      background-color: white;
    `}
`;

const RightOverleaf = Overleaf.extend.attrs({
  className: 'overleaves-wrapper-overleafright',
})`
  background-color: ${props => (props.theme.messagesRight || defaultTheme.messagesRight).background};
  color: ${props => (props.theme.messagesLeft || defaultTheme.messagesLeft).color};
  right: -${openOverleafWidth - closedOverleafWidth}%;

  transition: right 0.2s;

  ${props => props.open &&
    css`
      right: 0;
      border-left: ${bufferBorderWidth}px solid white;
      background-color: white;
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
  className: 'overleaves-wrapper-overleafcontent-left',
})`
  background-color: ${props => (props.theme.messagesLeft || defaultTheme.messagesLeft).background};
  color: ${props => (props.theme.messagesLeft || defaultTheme.messagesLeft).color};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const RightContent = OverleafContent.extend.attrs({
  className: 'overleaves-wrapper-overleafcontent-left',
})`
  background-color: ${props => (props.theme.messagesRight || defaultTheme.messagesRight).background};
  color: ${props => (props.theme.messagesRight || defaultTheme.messagesRight).color};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
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
      // closedLeftOverleaf,
      // closedRightOverleaf,
    } = this.props;

    return (
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
    );
  }
}

ThreadContainerWithOverleaves.propTypes = {
  children: PropTypes.node,
  leftOverleaf: PropTypes.node,
  rightOverleaf: PropTypes.node,
};

ThreadContainerWithOverleaves.defaultProps = {
  children: null,
  leftOverleaf: null,
  rightOverleaf: null,
};

export default ThreadContainerWithOverleaves;
