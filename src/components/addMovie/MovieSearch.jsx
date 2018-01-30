import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { findMatchingMovies } from '../../actions/movies.js';

import TextBox from '../TextBox.jsx';
import { buttonMinHeight } from '../../util/constants.js';

const Search = styled.div`
  width: 100%;
  position: relative;
`;

const Options = styled.div`
  position: absolute;
  top: ${buttonMinHeight};
`;

const Option = styled.div``;

class MovieSearch extends Component {
  state = {
    selectedMovie: {},
    showSuggestions: true
  }

  onUpdateText = (text) => {
    // select movie if movie title in suggestions exactly matches text
    this.props.findMatchingMovies(text);
  }

  onSelectMatch = (selectedMovie) => {
    this.setState({
      selectedMovie,
      showSuggestions: false
    }, () => {
      if (typeof this.props.onFindMovie === 'function') {
        this.props.onFindMovie(selectedMovie);
      }
    });
  }

  render() {
    const { showSuggestions } = this.state;
    return (
      <Search className="movie-search">
        <Options>
          {showSuggestions && this.props.matches.map(movie => (
            <Option
              key={`search-result-${movie.id}`}
              onClick={this.onSelectMatch(movie)}
            >
              {movie.title}
            </Option>
          ))}
        </Options>

        <TextBox
          height={buttonMinHeight}
          onUpdateText={this.onUpdateText}
        />
      </Search>
    );
  }
}

MovieSearch.propTypes = {
  matches: PropTypes.array,
  onFindMovie: PropTypes.func,
  findMatchingMovies: PropTypes.func
};

MovieSearch.defaultProps = {
  matches: [],
  onFindMovie: null,
  findMatchingMovies: null
};

function mapStateToProps(state) {
  return {
    matches: state.movies.searchMatches
  };
}

function mapDispatchToProps(dispatch) {
  return {
    findMatchingMovies: text => findMatchingMovies(dispatch, text)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieSearch);
