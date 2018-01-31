import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Friend } from './_StyledComponents.jsx';

const Friends = styled.div`
`;

const SelectAFriend = Friend.extend`
  color: black;
`;

const SelectFriends = ({
  friends,
  taggedFriends,
  onSelectFriend,
  onUnselectFriend
}) => {
  function isFriendTagged(friend) {
    return taggedFriends.filter(tagged => tagged.id === friend.id).length > 0;
  }

  function getToggleSelectFriend(friend) {
    if (isFriendTagged(friend)) {
      return () => onUnselectFriend(friend);
    }

    return () => onSelectFriend(friend);
  }

  return (
    <Friends>
      {friends.map(friend => (
        <SelectAFriend
          key={`select-friend-${friend.id}`}
          onClick={getToggleSelectFriend(friend)}
        >
          {friend.name}
        </SelectAFriend>
      ))}
    </Friends>
  );
};

SelectFriends.propTypes = {
  friends: PropTypes.array,
  taggedFriends: PropTypes.array,
  onSelectFriend: PropTypes.func.isRequired,
  onUnselectFriend: PropTypes.func.isRequired
};

SelectFriends.defaultProps = {
  friends: [],
  taggedFriends: []
};

export default SelectFriends;
