import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Search from '../Search/Search';
import {
  findFriendByName,
  findPersonByIdentifier,
  FIND_PERSON_BY_IDENTIFIER,
} from '../../actions/friends';

const FriendSearch = ({
  findBy,
  onFriendFound,
  children,

  matches,
  findFriend,
  findPerson,
}) => (
  <Search
    matches={matches}
    findMatches={
      findBy === FIND_PERSON_BY_IDENTIFIER ?
        findPerson : findFriend
    }
    onConfirmFound={onFriendFound}
    placeholder="Find a friend"
  >
    {children}
  </Search>
);

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FriendSearch);
