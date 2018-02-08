import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { GREEN_BANNER, DARK } from '../util/themes';

import { Button } from './_StyledComponents';
import FriendSearch from './friends/FriendSearch';

// STYLES
const SelectableFriendsContainer = styled.div`
  display: flex;
`;

const Friends = styled.div.attrs({
  className: 'selectablefriends-friends',
})``;

const Friend = Button.extend.attrs({
  className: 'selectablefriends-friend',
})`
  background-color: ${props => (props.isSelected ?
    GREEN_BANNER.background : 'white')};
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
    <SelectableFriendsContainer className={`selectablefriends-friends ${className}`}>
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
    </SelectableFriendsContainer>
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
