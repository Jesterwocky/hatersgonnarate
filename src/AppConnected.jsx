import React from 'react';
import { Provider } from 'react-redux';

import store from './Store';
import App from './components/App';

const AppConnected = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppConnected;
