import React from 'react';
import { Provider } from 'react-redux';

import store from './store.js';
import App from './components/App.jsx';

const AppConnected = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppConnected;
