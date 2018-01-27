/* global document */

import { render } from 'react-dom';
import React from 'react';

import App from './components/App.jsx';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <App />,
    document.getElementById('root')
  );
});
