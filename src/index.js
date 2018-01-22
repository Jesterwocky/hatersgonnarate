/* global document */

import ReactDOM from 'react-dom';
import React from 'react';

// should not need the extension. Why webpack not resolve?
import App from './App.jsx';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});
