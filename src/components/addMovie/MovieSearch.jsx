import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { findMatchingMovies } from '../../actions/movies.js';

import TextBox from '../TextBox.jsx';
import { buttonMinHeight } from '../../util/constants.js';

const Search = styled.div.attrs({
  className: 'movie-search'
})`
  width: 100%;
  position: relative;
`;

const Options = styled.div.attrs({
  className: 'movie-search-options'
})`
  position: absolute;
  top: ${buttonMinHeight};
  width: 100%;
  box-sizing: border-box;
  background-color: #e4f1fb;
  font-size: 12px;
  padding: 5px;
`;

const Option = styled.div.attrs({
  className: 'movie-search-options-option'
})`
  white-space: nowrap;
  padding: 3px 0;
  overflow: hidden;
`;

const SearchText = styled(TextBox).attrs({
  className: 'movie-search-searchtext',
  height: buttonMinHeight
})``;

class MovieSearch extends Component {
  state = {
    selectedMovie: {},
    showSuggestions: false
  }

  onUpdateText = (text) => {
    // select movie if movie title in suggestions exactly matches text
    this.props.findMatchingMovies(text);

    const shouldShowSuggestions = !(text === '');

    if (shouldShowSuggestions !== this.state.showSuggestions) {
      this.setState({
        showSuggestions: shouldShowSuggestions
      });
    }
  }

  getOnSelectMatch = selectedMovie => () => {
    if (typeof this.props.onFindMovie === 'function') {
      this.props.onFindMovie(selectedMovie);
    }

    this.setState({
      selectedMovie,
      showSuggestions: false
    });
  }

  render() {
    const { showSuggestions } = this.state;

    return (
      <Search>

        {showSuggestions && this.props.matches.length > 0 &&
          <Options>
            {this.props.matches.map(movie => (

              <Option
                key={`search-result-${movie.id}`}
                onClick={this.getOnSelectMatch(movie)}
              >
                {movie.title}
              </Option>

            ))}
          </Options>
        }

        <SearchText
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
