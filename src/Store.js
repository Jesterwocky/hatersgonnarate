import { combineReducers, createStore } from 'redux';

import { default as friends } from './reducers/friends.js';
import { default as movies } from './reducers/movies.js';
import { default as parties } from './reducers/parties.js';
import { default as user } from './reducers/user.js';

const initialState = {
  user: {},
  movies: {},
  friends: {},
  parties: {}
};

const store = createStore(
  combineReducers({
    friends,
    movies,
    parties,
    user
  }),
  initialState
);

export default store;
