import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { ADD_MOVIE_MODAL } from '../util/constants.js';

import Footer from './Footer.jsx';
import NavBar from './NavBar.jsx';
import HomePage from './pages/HomePage.jsx';
import AddMovieModal from './modals/AddMovieModal/AddMovieModal.jsx';

export const PageBase = styled.div`
  font-family: sans-serif;
  min-height: 100vh;
  box-sizing: border-box; // ignore page padding in vh calc
  display: flex;
  flex-direction: column;
`;

const App = ({ openModal }) => {
  return (
    <PageBase>
      <NavBar />
      <HomePage />
      <Footer />
      {openModal === ADD_MOVIE_MODAL &&
        <AddMovieModal />
      }
    </PageBase>
  );
}


function mapStateToProps(state) {
  return {
    openModal: state.modals.modalName
  };
}

export default connect(mapStateToProps)(App);
