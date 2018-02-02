import React from 'react';
import { render } from 'react-dom';
import store from './store.js';
import { Provider } from 'react-redux';

import App from './components/App.jsx';

const AppConnected = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppConnected;
