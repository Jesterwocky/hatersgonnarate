import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { buttonMinHeight, buttonColor, themes } from '../util/constants.js';

const Suggestions = styled.div.attrs({
  className: 'search-suggestions'
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

const Suggestion = styled.div.attrs({
  className: 'movie-search-options-option'
})`
  white-space: nowrap;
  padding: 7px 0;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
`;

const SearchSuggestions = ({ suggestions, onSelectSuggestion }) => {
  function onSelect(suggestion) {
    return () => onSelectSuggestion(suggestion);
  }

  return (
    <Suggestions>
      {suggestions.map(suggestion => (
        <Suggestion
          key={`suggestion-${suggestion.id}`}
          onClick={onSelect(suggestion)}
        >
          {suggestion.text}
        </Suggestion>
      ))}
    </Suggestions>
  );
};

SearchSuggestions.propTypes = {
  suggestions: PropTypes.array.isRequired,
  onSelectSuggestion: PropTypes.func.isRequired
};

export default SearchSuggestions;
