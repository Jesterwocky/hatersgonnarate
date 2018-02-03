import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  buttonMinHeight,
  headerColor,
  fieldOnWhiteColor,
  textColor,
  themes,
  lightTheme
} from '../util/constants.js';

const Area = styled.textarea.attrs({
  className: 'text-area'
})`
  flex: 1;
  font-size: 16px;
  padding: 15px;
  border: none;
  border-radius: 2px;
  box-sizing: border-box;
  width: 100%;
  min-width: 100%; // prevent weird resizing (e.g., in chrome)
  min-height: 70px;
  height: ${props => (props.height ? `${props.height}px` : 'auto')};
  background-color: ${props => (
    props.theme === themes.LIGHT ?
      lightTheme.field['background-color'] :
      headerColor
  )};
  color: ${props => (
    props.theme === themes.LIGHT ?
      lightTheme.field.color :
      textColor
  )};
`;

const TextArea = ({ text, placeholder, onUpdateText, theme }) => {
  function onChange(e) {
    if (typeof onUpdateText === 'function') {
      onUpdateText(e.currentTarget.value);
    }
  }

  return (
    <Area
      theme={theme}
      value={text}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

TextArea.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  onUpdateText: PropTypes.func,
  theme: PropTypes.string
};

TextArea.defaultProps = {
  text: '',
  placeholder: '',
  onUpdateText: null,
  theme: ''
};

export default TextArea;
