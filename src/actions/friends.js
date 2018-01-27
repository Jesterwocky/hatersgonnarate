import { friends, friendsFull } from './_testData.js';

const initialState = {
  friends: {},
  currentFriend: {}
};

// action types
export const GET_FRIENDS = 'GET_FRIENDS';
export const GET_FRIEND = 'GET_FRIEND';

// action creators
function createGetFriendsAction(friends) {
  return {
    type: GET_FRIENDS,
    payload: {
      friends
    }
  }
}

function createGetFriendAction(friend) {
  return {
    type: GET_FRIEND,
    payload: {
      friend
    }
  }
}

export function getFriends(dispatch) {
  dispatch(createGetFriendsAction(friends));
}

export function getFriend(dispatch, userid) {
  dispatch(createGetFriendAction(friendsFull[userid]));
}
