import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { buttonMinHeight } from '../../util/constants';
import { DARK } from '../../util/themes';

const Suggestions = styled.div.attrs({
  className: 'search-suggestions',
})`
  position: absolute;
  top: ${buttonMinHeight};
  width: 100%;
  box-sizing: border-box;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
  padding: 5px;

  background-color: ${DARK.button.background};
  color: white;
  font-size: 14px;
`;

const Suggestion = styled.div.attrs({
  className: 'movie-search-options-option',
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
          {suggestion.title || suggestion.username}
        </Suggestion>
      ))}
    </Suggestions>
  );
};

SearchSuggestions.propTypes = {
  suggestions: PropTypes.array.isRequired,
  onSelectSuggestion: PropTypes.func.isRequired,
};

export default SearchSuggestions;
