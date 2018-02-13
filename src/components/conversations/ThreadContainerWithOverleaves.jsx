import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SHAME_COLOR, SHAME_BACKGROUND } from '../../util/themes';

const closedOverfleafWidth = 18;
const bufferBorderWidth = 4;
const openOverfleafWidth = `calc(100% - ${closedOverfleafWidth + bufferBorderWidth}px)`;

// Container for the conversation contents. Used to position overleaves to
// left and right
const ThreadContainerWithOverleavesWrapper = styled.div.attrs({
  className: 'overleaves-wrapper',
})`
  height: 100%;
  position: relative;
  padding: 0 ${closedOverfleafWidth}px;
  margin-top: 5px;
  border-radius: 4px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  overflow: hidden;
`;

const Overfleaf = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: ${props => (props.open ? openOverfleafWidth : `${closedOverfleafWidth}px`)};
`;

const LeftOverleaf = Overfleaf.extend.attrs({
  className: 'overleaves-wrapper-overleaf-left',
})`
  background-color: ${props => (props.open ? 'white' : SHAME_COLOR)};
  color: white;
  left: 0;
  border-right: ${props => (props.open ? `${bufferBorderWidth}px solid white` : 'none')};
`;

const RightOverleaf = Overfleaf.extend.attrs({
  className: 'overleaves-wrapper-overleafright',
})`
  background-color: ${props => (props.open ? 'white' : SHAME_BACKGROUND)};
  color: ${SHAME_COLOR};
  right: 0;
  border-left: ${props => (props.open ? `${bufferBorderWidth}px solid white` : 'none')};
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
`;

const LeftContent = OverleafContent.extend.attrs({
  className: 'overleaves-wrapper-overleafcontent-left',
})`
  background-color: ${SHAME_COLOR};
  color: white;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const RightContent = OverleafContent.extend.attrs({
  className: 'overleaves-wrapper-overleafcontent-left',
})`
  background-color: ${SHAME_BACKGROUND};
  color: ${SHAME_COLOR};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const overleaves = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

// TODO: if message is responding to the message immediately preceding it,
// don't quote that message in the response even if the data is there

class ThreadContainerWithOverleaves extends Component {
  state = {
    overleafOpen: null,
  }

  toggleLeftOverfleaf = () => {
    const overleafState = this.state.overleafOpen === overleaves.LEFT ?
      null : overleaves.LEFT;

    this.setState({
      overleafOpen: overleafState,
    });
  }

  toggleRightOverfleaf = () => {
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
          onClick={this.toggleLeftOverfleaf}
          open={this.state.overleafOpen === overleaves.LEFT}
        >
          {this.state.overleafOpen === overleaves.LEFT &&
            <LeftContent>
              {leftOverleaf}
            </LeftContent>
          }
        </LeftOverleaf>

        <RightOverleaf
          onClick={this.toggleRightOverfleaf}
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
