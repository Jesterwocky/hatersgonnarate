/* global document */

import React from 'react';
import { render } from 'react-dom';
import store from './store.js';
import { Provider } from 'react-redux';

import App from './components/App.jsx';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
});
