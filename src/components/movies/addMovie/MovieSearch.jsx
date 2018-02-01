import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { findMatchingMovies } from '../../../actions/movies.js';

import TextBox from '../../TextBox.jsx';
import { buttonMinHeight, buttonColor, themes } from '../../../util/constants.js';

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
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
  padding: 5px;

  background-color: ${buttonColor};
  color: white;
  font-size: 14px;
`;

const Option = styled.div.attrs({
  className: 'movie-search-options-option'
})`
  white-space: nowrap;
  padding: 7px 0;
  overflow: hidden;
`;

const SearchText = styled(TextBox).attrs({
  className: 'movie-search-searchtext',
  height: buttonMinHeight,
})``;

// TODO: listen for enter and interpret as Search click when component's focused
class MovieSearch extends Component {
  state = {
    searchString: '',
    selectedMovie: {},
    showSuggestions: false
  }

  onUpdateText = (text) => {
    // TODO: select movie if movie title in suggestions exactly matches text
    this.props.findMatchingMovies(text);

    this.setState({
      selectedMovie: {},
      searchString: text,
      showSuggestions: !(text === '')
    });
  }

  getOnSelectMatch = selectedMovie => () => {
    if (typeof this.props.onFindMovie === 'function') {
      this.props.onFindMovie(selectedMovie);
    }

    this.setState({
      selectedMovie,
      searchString: selectedMovie.title,
      showSuggestions: false
    });
  }

  render() {
    const { searchString, showSuggestions } = this.state;
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
          text={searchString}
          onUpdateText={this.onUpdateText}
          theme={this.props.theme}
        />
      </Search>
    );
  }
}

MovieSearch.propTypes = {
  matches: PropTypes.array,
  onFindMovie: PropTypes.func,
  findMatchingMovies: PropTypes.func,
  theme: PropTypes.string
};

MovieSearch.defaultProps = {
  matches: [],
  onFindMovie: null,
  findMatchingMovies: null,
  theme: ''
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
