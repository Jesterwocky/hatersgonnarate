import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { GREEN, DARK } from '../util/themes';

import { Button } from './_StyledComponents';
import FriendSearch from './friends/FriendSearch';

// STYLED COMPONENTS
const SelectFriendsContainer = styled.div.attrs({
  className: 'selectfriends',
})`
  display: flex;
`;

const Friends = styled.div.attrs({
  className: 'selectfriends-friends',
})``;

const Friend = Button.extend.attrs({
  className: 'selectfriends-friend',
})`
  background-color: ${props => (props.isSelected ?
    GREEN.background : 'white')};
  color: ${props => (props.isSelected ?
    'white' : DARK.button.background
  )};
  border: 2px solid ${props => (props.isSelected ?
    '#4fc196' : '#e4e4ff'
  )};
  border-radius: 2px;
  margin-right: 5px;

  &:hover {
    cursor: pointer;
  }
`;

// COMPONENT
const SelectFriends = ({
  friends,
  onToggle,
  onFriendFound,
  className,
  allowSearch = true,
}) => {
  function getOnToggleFriend(id) {
    return () => onToggle(id);
  }

  return (
    <SelectFriendsContainer>
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
      {allowSearch &&
        <FriendSearch
          onFriendFound={onFriendFound}
        />
      }
    </SelectFriendsContainer>
  );
};

// PROPS and EXPORT
SelectFriends.propTypes = {
  friends: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  onFriendFound: PropTypes.func.isRequired,
  className: PropTypes.string,
  allowSearch: PropTypes.bool,
};

SelectFriends.defaultProps = {
  className: '',
  allowSearch: true,
};

export default SelectFriends;
