import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { buttonColor, textColor, greenBanner } from '../util/constants.js';
import { hasItem } from '../util/helpers.js';

import { Button } from './_StyledComponents.jsx';
import FriendSearch from './friends/FriendSearch.jsx';

const Friends = styled.div.attrs({
  className: 'selectable-friends'
})`
  display: flex;
`;

const SelectableFriend = Button.extend.attrs({
  className: 'selectable-friends-friend'
})`
  background-color: ${props => (props.isSelected ?
    greenBanner['background-color'] : 'white')};
  color: ${props => (props.isSelected ? 'white' : buttonColor)};
  border: 1px solid ${props => (props.isSelected ? greenBanner.color : textColor)};
  border-radius: 3px;
  margin-right: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const SelectFriends = ({
  friends,
  onToggle
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
      <FriendSearch />
    </Friends>
  );
};

SelectFriends.propTypes = {
  friends: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default SelectFriends;
