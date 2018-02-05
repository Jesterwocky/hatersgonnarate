import {
  GET_FRIENDS,
  GET_FRIEND,
  GET_FRIENDS_MATCHING_SEARCH,
} from '../actions/friends.js';

const initialState = {
  friends: {},
  searchMatches: [],
  currentFriend: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FRIENDS:
      return {
        ...state,
        friends: {
          ...state.friends,
          ...action.payload.friends,
        },
      };
    case GET_FRIEND:
      return {
        ...state,
        currentFriend: action.payload.friend,
      };
    case GET_FRIENDS_MATCHING_SEARCH:
      return {
        ...state,
        searchMatches: action.payload.searchMatches,
      };
    default:
      return state;
  }
}

export default reducer;
