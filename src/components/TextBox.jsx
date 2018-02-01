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

const Field = styled.input.attrs({
  type: 'text',
  className: 'text-box'
})`
  flex: 1;
  font-size: 14px;
  padding: 0 15px;
  border: none;
  border-radius: 2px;
  box-sizing: border-box;
  width: 100%;
  min-height: ${buttonMinHeight};
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

const TextBox = ({ text, placeholder, onUpdateText, theme }) => {
  function onChange(e) {
    if (typeof onUpdateText === 'function') {
      onUpdateText(e.currentTarget.value);
    }
  }

  return (
    <Field
      theme={theme}
      value={text}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

TextBox.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  onUpdateText: PropTypes.func,
  theme: PropTypes.string
};

TextBox.defaultProps = {
  text: '',
  placeholder: '',
  onUpdateText: null,
  theme: ''
};

export default TextBox;
