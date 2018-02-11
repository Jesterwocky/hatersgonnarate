import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { modalNames } from '../util/constants';
import { DARK } from '../util/themes';

import Footer from './Footer';
import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import AddMovieModal from './modals/AddMovieModal/AddMovieModal';
import CalloutModal from './modals/CalloutModal/CalloutModal';

export const PageBase = styled.div`
  font-family: sans-serif;
  min-height: 100vh;
  box-sizing: border-box; // ignore page padding in vh calc
  display: flex;
  flex-direction: column;
  background-color: ${DARK.background};
  color: ${DARK.color};
`;

const App = ({ openModal }) => (
  <PageBase>
    <NavBar />
    <HomePage />
    <Footer />
    {openModal === modalNames.ADD_MOVIE_MODAL &&
      <AddMovieModal />
    }
    {openModal === modalNames.CALLOUT_MODAL &&
      <CalloutModal />
    }
  </PageBase>
);

App.propTypes = {
  openModal: PropTypes.string,
};

App.defaultProps = {
  openModal: null,
};

function mapStateToProps(state) {
  return {
    openModal: state.modals.modalName,
  };
}

export default connect(mapStateToProps)(App);
