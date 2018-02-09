import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { GREEN, DARK, LIGHT } from '../util/themes';

import { Button } from './_StyledComponents';

// STYLED COMPONENTS
const Friends = styled.div.attrs({
  className: 'selectfriends-friends',
})`
  margin-bottom: 7px;
`;

const Friend = Button.extend.attrs({
  className: 'selectfriends-friend',
})`
  background-color: ${props => (
    props.isSelected ?
      GREEN.background : 'white')};
  color: ${props => (
    props.isSelected ?
      'white' : DARK.button.background
  )};
  border: 1px solid ${props => (
    props.isSelected ?
      GREEN.background : LIGHT.button.borderColor
  )};
  border-radius: 2px;
  margin-right: 7px;
  padding: 0 10px;
  font-size: 12px;
  height: 32px;

  &:hover {
    cursor: pointer;
  }
`;

// COMPONENT
const SelectFriends = ({
  friends,
  onToggle,
}) => {
  function getOnToggleFriend(id) {
    return () => onToggle(id);
  }

  return (
    <Friends>
      {friends.map(friend => (
        <Friend
          isSelected={friend.isSelected}
          key={`friend-${friend.id}`}
          onClick={getOnToggleFriend(friend.id)}
        >
          {friend.username}
        </Friend>
      ))}
    </Friends>
  );
};

// PROPS and EXPORT
SelectFriends.propTypes = {
  friends: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default SelectFriends;
