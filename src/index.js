/* global document */

import React from 'react';
import { render } from 'react-dom';

import AppConnected from './AppConnected';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <AppConnected />,
    document.getElementById('root'),
  );

  if (module.hot) {
    module.hot.accept('./AppConnected', () => {
      render(
        require('./AppConnected').default,
        document.getElementById('root'),
      );
    });
  }
});
