import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// data from DB
import { default as friends } from './reducers/friends';
import { default as movies } from './reducers/movies';
import { default as parties } from './reducers/parties';
import { default as user } from './reducers/user';

// data not yet saved to DB
import { default as rating } from './reducers/unsavedData/newRating';

// app state
import { default as modals } from './reducers/modals';

const store = createStore(
  combineReducers({
    user,
    movies,
    friends,
    parties,
    new: combineReducers({
      rating,
    }),
    modals,
  }),
  applyMiddleware(thunk),
);

export default store;
