import {
  GET_FRIENDS,
  GET_FRIEND
} from '../actions/friends.js';

const initialState = {
  friends: {},
  currentFriend: {}
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FRIENDS:
      return {
        ...state,
        friends: {
          ...state.friends,
          ...action.payload.friends
        }
      };
    case GET_FRIEND:
      return {
        ...state,
        currentFriend: action.payload.friend
      };
    default:
      return state;
  }
}

export default reducer;
