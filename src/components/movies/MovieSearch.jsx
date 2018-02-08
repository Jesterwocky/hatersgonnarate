import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ADD_MOVIE_MODAL } from '../../util/constants';

import { findMatchingMovies } from '../../actions/movies';
import { openModal } from '../../actions/modals';

import Search from '../Search/Search';

const MovieSearch = ({
  matches,
  findMovies,
  onMovieFound,
  openAddMovieModal,
  confirmOnSelect,
  showButton,
  children,
}) => (
  <Search
    className="movie-search"
    matches={matches}
    findMatches={findMovies}
    onConfirmFound={onMovieFound || openAddMovieModal}
    confirmOnSelect={confirmOnSelect}
    showButton={showButton}
    placeholder="Search for a movie"
  >
    {children}
  </Search>
);

MovieSearch.propTypes = {
  openAddMovieModal: PropTypes.func.isRequired,
  matches: PropTypes.array,
  findMovies: PropTypes.func.isRequired,
  onMovieFound: PropTypes.func,
  confirmOnSelect: PropTypes.bool,
  showButton: PropTypes.bool,
  children: PropTypes.node,
};

MovieSearch.defaultProps = {
  matches: [],
  onMovieFound: null,
  confirmOnSelect: false,
  showButton: true,
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
      {
        movieId: movie.id,
      },
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieSearch);
