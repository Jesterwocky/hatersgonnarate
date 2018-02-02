/* global document */

import React from 'react';
import { render } from 'react-dom';
import store from './store.js';
import { Provider } from 'react-redux';

import AppConnected from './AppConnected.jsx';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <AppConnected />,
    document.getElementById('root')
  );

  if (module.hot) {
    module.hot.accept('./AppConnected.jsx', () => {
      render(
        require('./AppConnected.jsx').default,
        document.getElementById('root')
      );
    });
  }
});
