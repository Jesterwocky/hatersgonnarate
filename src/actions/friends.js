import { friends as testFriends, friendsFull, matchingFriendsList } from './_testData.js';

// action types
export const GET_FRIENDS = 'GET_FRIENDS';
export const GET_FRIEND = 'GET_FRIEND';
export const GET_FRIENDS_MATCHING_SEARCH = 'GET_FRIENDS_MATCHING_SEARCH';

// action creators
function getFriendsAction(friends) {
  return {
    type: GET_FRIENDS,
    payload: {
      friends
    }
  };
}

function getFriendAction(friend) {
  return {
    type: GET_FRIEND,
    payload: {
      friend
    }
  }
}

function getMatchingFriendsAction(searchMatches) {
  return {
    type: GET_FRIENDS_MATCHING_SEARCH,
    payload: {
      searchMatches
    }
  };
}

export function getFriends(dispatch) {
  dispatch(getFriendsAction(testFriends));
}

export function getFriend(dispatch, userid) {
  dispatch(getFriendAction(friendsFull[userid]));
}

export function findMatchingMovies(dispatch, friendString) {
  dispatch(getMatchingFriendsAction(matchingFriendsList));
}
