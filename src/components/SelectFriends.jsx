import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { GREEN_BANNER, DARK } from '../util/themes';

import { Button } from './_StyledComponents';
import FriendSearch from './friends/FriendSearch';

const Friends = styled.div.attrs({
  className: 'selectable-friends',
})`
  display: flex;
`;

const SelectableFriend = Button.extend.attrs({
  className: 'selectable-friends-friend',
})`
  background-color: ${props => (props.isSelected ?
    GREEN_BANNER.background : 'white')};
  color: ${props => (props.isSelected ? 'white' : DARK.button.background)};
  border: 1px solid ${props => (props.isSelected ? GREEN_BANNER.color : DARK.color)};
  border-radius: 3px;
  margin-right: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const SelectFriends = ({
  friends,
  onToggle,
}) => {
  function getOnToggleFriend(friendKey) {
    return () => onToggle(friendKey);
  }

  return (
    <Friends>
      {friends.map(friend => (
        <SelectableFriend
          isSelected={friend.isSelected}
          key={`friend-${friend.friendKey}`}
          onClick={getOnToggleFriend(friend.friendKey)}
        >
          {friend.username}
        </SelectableFriend>
      ))}
    </Friends>
  );
};

SelectFriends.propTypes = {
  friends: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default SelectFriends;
