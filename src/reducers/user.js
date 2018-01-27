import {
  GET_USER,
  UPDATE_USER
} from '../actions/user.js';

const initialState = {
  username: '',
  id: '',
  profilePicUrl: ''
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...action.payload.user
      };
    case UPDATE_USER:
      return {
        ...state,
        ...action.payload.user
      }
    default:
      return state;
  }
}

export default reducer;
