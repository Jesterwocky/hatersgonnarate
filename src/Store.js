import { combineReducers, createStore } from 'redux';

import { default as friends } from './reducers/friends.js';
import { default as movies } from './reducers/movies.js';
import { default as parties } from './reducers/parties.js';
import { default as user } from './reducers/user.js';
import { default as newRating } from './reducers/modals/newRating.js';
import { default as modals } from './reducers/modals/modals.js';

const store = createStore(combineReducers({
  user,
  movies,
  friends,
  parties,
  newRating,
  modals
}));

export default store;
