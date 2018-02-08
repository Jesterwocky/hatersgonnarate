import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { buttonMinHeight, modalBannerZIndex } from '../../util/constants';
import { DARK, FIELD_SIZE_NORMAL } from '../../util/themes';

const defaultFieldSize = FIELD_SIZE_NORMAL;
const suggestionLimit = 5;
const lastItemPadding = 5;

function getSuggestionHeight(props) {
  return props.theme.fieldHeight || defaultFieldSize.fieldHeight;
}

const Suggestions = styled.div.attrs({
  className: 'search-suggestions',
})`
  position: absolute;
  top: ${buttonMinHeight};
  z-index: ${modalBannerZIndex};
  height: ${props => (getSuggestionHeight(props) * suggestionLimit) + lastItemPadding}px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;

  color: white;
  font-size: ${props => props.theme.fieldFontSize || defaultFieldSize.fieldFontSize}px;
`;

const Suggestion = styled.div.attrs({
  className: 'movie-search-options-option',
})`
  background-color: ${DARK.button.background};

  white-space: nowrap;
  box-sizing: content-box;
  padding: 0 10px;
  height: ${getSuggestionHeight}px;

  display: flex;
  align-items: center;

  &:last-child {
    padding-bottom: ${lastItemPadding}px;
  }

  &:hover {
    cursor: pointer;
    background-color: #5f5cc5;
  }
`;

const SearchSuggestions = ({ suggestions, onSelectSuggestion }) => {
  function onSelect(suggestion) {
    return () => onSelectSuggestion(suggestion);
  }

  return (
    <Suggestions>
      {suggestions.slice(0, suggestionLimit).map(suggestion => (
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
