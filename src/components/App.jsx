import React from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import store from '../store.js';

import Footer from '../components/Footer.jsx';
import NavBar from '../components/NavBar.jsx';
import Movies from '../components/pages/Movies.jsx';

export const PageBase = styled.div`
  font-family: sans-serif;
  min-height: 100vh;
  box-sizing: border-box; // ignore page padding in vh calc
  display: flex;
  flex-direction: column;
`;

const App = () => (
  <Provider store={store}>
    <PageBase>
      <NavBar />
      <Movies />
      <Footer />
    </PageBase>
  </Provider>
);

export default App;
