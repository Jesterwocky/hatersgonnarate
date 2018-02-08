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
  flex-direction: column;
`;

const Friends = styled.div.attrs({
  className: 'selectfriends-friends',
})`
  margin-bottom: 5px;
`;

const Friend = Button.extend.attrs({
  className: 'selectfriends-friend',
})`
  background-color: ${props => (props.isSelected ?
    GREEN.background : 'white')};
  color: ${props => (props.isSelected ?
    'white' : DARK.button.background
  )};
  border: 1px solid ${props => (props.isSelected ?
    GREEN.background : '#e4e4ff'
  )};
  border-radius: 2px;
  margin-right: 7px;
  margin-bottom: 7px;
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
  onFriendFound,
  allowSearch = true,
}) => {
  function getOnToggleFriend(id) {
    return () => onToggle(id);
  }

  function onFind(friend) {
    if (Object.keys(friend).length === 0) return;

    onFriendFound(friend);
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
          onFriendFound={onFind}
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
  allowSearch: PropTypes.bool,
};

SelectFriends.defaultProps = {
  allowSearch: true,
};

export default SelectFriends;
