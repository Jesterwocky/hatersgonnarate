import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import styled from 'styled-components';

import { ADD_MOVIE_MODAL } from '../../util/constants';

import { findMatchingMovies } from '../../actions/movies';
import { openModal } from '../../actions/modals/modals';

import Search from '../Search/Search';

const MovieSearch = ({
  matches,
  findMovies,
  onMovieFound,
  openAddMovieModal,
  confirmOnSelect,
  children,
}) => (
  <Search
    matches={matches}
    findMatches={findMovies}
    onConfirmFound={onMovieFound || openAddMovieModal}
    confirmOnSelect={confirmOnSelect}
    placeholder="Search for a movie"
  >
    {children}
  </Search>
);

MovieSearch.propTypes = {
  openAddMovieModal: PropTypes.func.isRequired,
  matches: PropTypes.array,
  findMovies: PropTypes.func.isRequired,
  onMovieFound: PropTypes.func.isRequired,
  confirmOnSelect: PropTypes.bool,
  children: PropTypes.node,
};

MovieSearch.defaultProps = {
  matches: [],
  confirmOnSelect: false,
  children: null,
};

function mapStateToProps(state) {
  return {
    matches: state.movies.searchMatches,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    findMovies: text => findMatchingMovies(dispatch, text),
    openAddMovieModal: movie => openModal(
      dispatch,
      ADD_MOVIE_MODAL,
      { movie },
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieSearch);
