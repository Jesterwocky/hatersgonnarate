import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { openModal } from '../../../actions/modals/modals.js';
import { ADD_MOVIE_MODAL } from '../../../util/constants.js';
import { Button } from '../../_StyledComponents.jsx';

import MovieSearch from './MovieSearch.jsx';

const AddMovie = styled.div.attrs({
  className: 'add-movie-with-search'
})`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
`;

const SearchContainer = styled.div.attrs({
  className: 'add-movie-with-search-container'
})`
  margin-left: 10px;
  flex: 1;
`;

const AddButton = Button.extend`
  white-space: nowrap;
`;

class AddMovieWithSearch extends Component {
  state = {
    searchOpen: this.props.searchOpenByDefault,
    movieToAdd: {}
  };

  onGo = () => {
    const { onConfirmSelection, openAddMovieModal } = this.props;

    // By default, passes movie to modal and opens modal.
    // But will call custom function if provided (e.g., inside
    // modal, don't need to open modal).
    if (typeof onConfirmSelection === 'function') {
      onConfirmSelection(this.state.movieToAdd);
    } else {
      openAddMovieModal(this.state.movieToAdd);
    }
  }

  getMovieToAdd = (movie) => {
    this.setState({
      movieToAdd: movie
    });
  }

  // openSearch = () => {
  //   if (this.state.searchOpen) return;
  //
  //   this.setState({
  //     searchOpen: true
  //   });
  // }
  //
  // closeSearch = () => {
  //   if (!this.state.searchOpen) return;
  //
  //   this.setState({
  //     searchOpen: false
  //   });
  // }

  render() {
    // {this.state.searchOpen &&
    //   <SearchContainer className="add-movie-with-search-container">
    //     <MovieSearch
    //       onFindMovie={this.getMovieToAdd}
    //     />
    //   </SearchContainer>
    // }

    // <AddMovie
    //   className="add-movie-with-search"
    //   onMouseEnter={this.openSearch}
    //   onMouseLeave={this.closeSearch}
    // >

    return (
      <AddMovie>
        <AddButton onClick={this.onGo}>
          + Movie
        </AddButton>
        {this.props.allowSearch && this.state.searchOpen &&
          <SearchContainer>
            <MovieSearch
              theme={this.props.theme}
              onFindMovie={this.getMovieToAdd}
            />
          </SearchContainer>
        }
      </AddMovie>
    );
  }
}

AddMovieWithSearch.propTypes = {
  openAddMovieModal: PropTypes.func.isRequired,
  onConfirmSelection: PropTypes.func,
  allowSearch: PropTypes.bool,
  searchOpenByDefault: PropTypes.bool,
  theme: PropTypes.string
};

AddMovieWithSearch.defaultProps = {
  onConfirmSelection: null,
  allowSearch: true,
  searchOpenByDefault: true,
  theme: ''
};

function mapDispatchToProps(dispatch) {
  return {
    openAddMovieModal: movie => openModal(
      dispatch,
      ADD_MOVIE_MODAL,
      { movie }
    )
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AddMovieWithSearch);
