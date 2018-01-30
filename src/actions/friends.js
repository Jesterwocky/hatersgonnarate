import { friends, friendsFull } from './_testData.js';

// action types
export const GET_FRIENDS = 'GET_FRIENDS';
export const GET_FRIEND = 'GET_FRIEND';

// action creators
function getFriendsAction(friends) {
  return {
    type: GET_FRIENDS,
    payload: {
      friends
    }
  }
}

function getFriendAction(friend) {
  return {
    type: GET_FRIEND,
    payload: {
      friend
    }
  }
}

export function getFriends(dispatch) {
  dispatch(getFriendsAction(friends));
}

export function getFriend(dispatch, userid) {
  dispatch(getFriendAction(friendsFull[userid]));
}
