import { testUser } from '../actions/_testData';

import {
  GET_USER,
  UPDATE_USER,
} from '../actions/user';

// TODO: get actual user data. Not sure at what point it'll get got.
// Depends on how routing ends up, n stuff
const initialState = {
  ...testUser,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...action.payload.user,
      };
    case UPDATE_USER:
      return {
        ...state,
        ...action.payload.user,
      };
    default:
      return state;
  }
}

export default reducer;
