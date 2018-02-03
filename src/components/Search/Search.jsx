import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { buttonMinHeight } from '../../util/constants.js';

import { Button } from '../_StyledComponents.jsx';
import TextBox from '../TextBox.jsx';
import SearchSuggestions from './SearchSuggestions.jsx';

const SearchContainer = styled.div.attrs({
  className: 'search'
})`
  width: 100%;
  display: flex;
`;

const AddButton = Button.extend.attrs({
  className: 'search-button'
})`
  white-space: nowrap;
  margin-right: 10px;
`;

const SearchField = styled.div.attrs({
  className: 'search-field'
})`
  position: relative;
  flex: 1;
`;

const SearchText = styled(TextBox).attrs({
  className: 'movie-search-searchtext',
  height: buttonMinHeight
})``;

// TODO: listen for enter and interpret as Search click when component's focused
class Search extends Component {
  state = {
    searchString: '',
    selection: {},
    showSuggestions: false
  }

  onUpdateText = (text) => {
    // TODO: select movie if movie title in suggestions exactly matches text
    this.props.findMatches(text);

    this.setState({
      selection: {},
      searchString: text,
      showSuggestions: !(text === '')
    });
  }

  onItemFound = () => {
    this.confirmFoundAndClearSearch(this.state.selection);
  }

  onSelect = (selection) => {
    const { showButton = true, requireButtonClickForAction = true } = this.props;
    // if there's no search / go / add button, or if there's a button
    // but no click is required, selecting a suggestion is equivalent to
    // selecting a suggestion AND then clicking search/ go / add
    if (!showButton || !requireButtonClickForAction) {
      this.confirmFoundAndClearSearch();
    } else {
      this.setState({
        selection,
        // TODO: have one common property name for all searchable things, like 'searchName'
        searchString: selection.title || selection.username,
        showSuggestions: false
      });
    }
  }

  confirmFoundAndClearSearch = (selection) => {
    this.props.onConfirmFound(selection);
    this.clearSearch();
  }

  clearSearch = () => {
    this.setState({
      searchString: '',
      selection: {},
      showSuggestions: false
    });
  }

  render() {
    const {
      searchString,
      showSuggestions
    } = this.state;

    const {
      children,
      matches,
      theme,
      showButton = true,
      placeholder = 'search'
    } = this.props;

    return (
      <SearchContainer>
        {showButton &&
          <AddButton onClick={this.onItemFound}>
            {children || '+'}
          </AddButton>
        }

        <SearchField>
          {showSuggestions && matches.length > 0 &&
            <SearchSuggestions
              suggestions={matches}
              onSelectSuggestion={this.onSelect}
            />
          }

          <SearchText
            text={searchString}
            onUpdateText={this.onUpdateText}
            placeholder={placeholder}
            theme={theme}
          />
        </SearchField>
      </SearchContainer>
    );
  }
}

Search.propTypes = {
  findMatches: PropTypes.func,
  matches: PropTypes.array,
  onSelectSuggestion: PropTypes.func,
  onConfirmFound: PropTypes.func,
  confirmOnSelect: PropTypes.bool,
  placeholder: PropTypes.string,
  theme: PropTypes.string,
  showButton: PropTypes.bool,
  requireButtonClickForAction: PropTypes.bool,
  children: PropTypes.node
};

Search.defaultProps = {
  matches: [],
  onSelectSuggestion: null,
  findMatches: null,
  onConfirmFound: null,
  confirmOnSelect: true,
  placeholder: 'search',
  theme: '',
  showButton: true,
  requireButtonClickForAction: true,
  children: null
};

export default Search;
