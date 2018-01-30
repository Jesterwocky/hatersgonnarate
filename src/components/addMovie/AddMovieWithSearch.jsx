import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MovieSearch from './MovieSearch.jsx';

import AddMovieButton from './AddMovieButton.jsx';

const AddMovie = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
`;

const SearchContainer = styled.div`
  margin-left: 10px;
  flex: 1;
`;

class AddMovieWithSearch extends Component {
  state = {
    searchOpen: this.props.defaultOpen,
    movieToAdd: {}
  };

  getMovieToAdd = (movie) => {
    this.setState({
      movieToAdd: movie
    });
  }

  openSearch = () => {
    if (this.state.searchOpen) return;

    this.setState({
      searchOpen: true
    });
  }

  closeSearch = () => {
    if (!this.state.searchOpen) return;

    this.setState({
      searchOpen: false
    });
  }

  render() {
    // {this.state.searchOpen &&
    //   <SearchContainer className="add-movie-with-search-container">
    //     <MovieSearch
    //       onFindMovie={this.getMovieToAdd}
    //     />
    //   </SearchContainer>
    // }
    return (
      <AddMovie
        className="add-movie-with-search"
        onMouseEnter={this.openSearch}
        onMouseLeave={this.closeSearch}
      >
        <AddMovieButton
          movie={this.props.movieToAdd}
        >
          {this.props.children}
        </AddMovieButton>
        <SearchContainer className="add-movie-with-search-container">
          <MovieSearch
            onFindMovie={this.getMovieToAdd}
          />
        </SearchContainer>
      </AddMovie>
    );
  }
}

AddMovieWithSearch.propTypes = {
  defaultOpen: PropTypes.bool,
  children: PropTypes.node,
  movieToAdd: PropTypes.object
};

AddMovieWithSearch.defaultProps = {
  defaultOpen: false,
  children: null,
  movieToAdd: {}
};

export default AddMovieWithSearch;
