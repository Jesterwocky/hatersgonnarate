import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { GREEN_BANNER, DARK } from '../util/themes';

import { Button } from './_StyledComponents';
import FriendSearch from './friends/FriendSearch';

const Friends = styled.div`
  display: flex;
`;

const SelectableFriend = Button.extend.attrs({
  className: 'selectable-friends-friend',
})`
  background-color: ${props => (props.isSelected ?
    GREEN_BANNER.background : 'white')};
  color: ${props => (props.isSelected ? 'white' : DARK.button.background)};
  border: 2px solid ${props => (props.isSelected ? '#4fc196' : '#e4e4ff')};
  border-radius: 2px;
  margin-right: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const SelectFriends = ({
  friends,
  onToggle,
  onFriendFound,
  className,
}) => {
  function getOnToggleFriend(id) {
    return () => onToggle(id);
  }

  return (
    <Friends className={`selectable-friends ${className}`}>
      {friends.map(friend => (
        <SelectableFriend
          isSelected={friend.isSelected}
          key={`friend-${friend.id}`}
          onClick={getOnToggleFriend(friend.id)}
        >
          {friend.username}
        </SelectableFriend>
      ))}
      <FriendSearch
        onFriendFound={onFriendFound}
      />
    </Friends>
  );
};

SelectFriends.propTypes = {
  friends: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  onFriendFound: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SelectFriends.defaultProps = {
  className: '',
};

export default SelectFriends;
