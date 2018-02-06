import { friends as testFriends, friendsFull, matchingFriendsList } from './_testData.js';

// action types
export const GET_FRIENDS = 'GET_FRIENDS';
export const GET_FRIEND = 'GET_FRIEND';
export const GET_FRIENDS_MATCHING_SEARCH = 'GET_FRIENDS_MATCHING_SEARCH';

// search types
export const FIND_RIEND_BY_NAME = 'FIND_FRIEND_BY_NAME';
export const FIND_FRIENDS_BY_ATTRIBUTES = 'FIND_FRIENDS_BY_ATTRIBUTES';
export const FIND_PERSON_BY_IDENTIFIER = 'FIND_PERSON_BY_IDENTIFIER';

// action creators
function getFriendsAction(friends) {
  return {
    type: GET_FRIENDS,
    payload: {
      friends,
    },
  };
}

function getFriendAction(friend) {
  return {
    type: GET_FRIEND,
    payload: {
      friend,
    },
  };
}

function getMatchingFriendsAction(searchMatches) {
  return {
    type: GET_FRIENDS_MATCHING_SEARCH,
    payload: {
      searchMatches,
    },
  };
}
export function getFriends(dispatch) {
  dispatch(getFriendsAction(testFriends));
}

export function getFriend(dispatch, userid) {
  dispatch(getFriendAction(friendsFull[userid]));
}

// find current friends using name / nickname (non-unique)
export function findFriendByName(dispatch, friendString) {
  dispatch(getMatchingFriendsAction(matchingFriendsList));
}

// find anyone using unique identifier
export function findPersonByIdentifier(dispatch, friendString) {
  dispatch(getMatchingFriendsAction(matchingFriendsList));
}

// find people (current friends, people in extended friend group,
// or anyone) by genre interests, movie ratings in common, etc.
// Mostly for finding and suggesting potential party-goers or
// new friends, but also potentially TODO: user find by interest /
// commonality
export function findFriendsByAttributes(dispatch, options) {
  dispatch(getMatchingFriendsAction(matchingFriendsList));
}
