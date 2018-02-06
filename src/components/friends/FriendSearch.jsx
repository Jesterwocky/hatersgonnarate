import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Search from '../Search/Search';
import {
  findFriendsByNameOrUsername,
  findFriendsByAttributes,
  FIND_FRIEND_BY_NAME,
  FIND_PERSON_BY_IDENTIFIER,
  FIND_FRIENDS_BY_ATTRIBUTES,
} from '../../actions/friends';

const FriendSearch = ({
  matches,
  findBy,
  findFriend,
  findPerson,
  onFriendFound,
  children,
}) => (
  <Search
    matches={matches}
    findFriends={
      findBy === FIND_PERSON_BY_IDENTIFIER ?
        findPerson : findFriend
    }
    onFriendFound={onFriendFound}
    placeholder="Find a friend"
  >
    {children}
  </Search>
);

function mapStateToProps(state) {
  return {
    matches: state.friends.searchMatches,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    findFriend: text => findFriendByName(dispatch, text),
    findPerson: identifier => findPersonByIdentifier(dispatch, identifier),
  };
}

FriendSearch.propTypes = {
  findBy: PropTypes.string,
  matches: PropTypes.array,
  findFriend: PropTypes.func.isRequired,
  findPerson: PropTypes.func.isRequired,
  onFriendFound: PropTypes.func.isRequired,
  children: PropTypes.node,
};

FriendSearch.defaultProps = {
  findBy: '',
  matches: [],
  children: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FriendSearch);
