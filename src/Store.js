import { combineReducers, createStore } from 'redux';

import { default as friends } from './reducers/friends';
import { default as movies } from './reducers/movies';
import { default as parties } from './reducers/parties';
import { default as user } from './reducers/user';
import { default as newRating } from './reducers/modals/newRating';
import { default as modals } from './reducers/modals/modals';

const store = createStore(combineReducers({
  user,
  movies,
  friends,
  parties,
  newRating,
  modals,
}));

export default store;
