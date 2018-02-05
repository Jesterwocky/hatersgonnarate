import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { buttonMinHeight } from '../util/constants.js';
import { DARK } from '../util/themes.js';

const defaultTheme = DARK;

const Field = styled.input.attrs({
  type: 'text',
  className: 'text-box',
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
  color: ${props => (props.theme.field || defaultTheme.field).color};
  background-color: ${props => (props.theme.field || defaultTheme.field).background};

  &::placeholder {
    // TODO: darken dark color and lighten light color using percents
    color: ${props => (props.theme.field || defaultTheme.field).placholderColor}
  }
`;

const TextBox = ({
  text,
  placeholder,
  onUpdateText,
  theme,
}) => {
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
};

TextBox.defaultProps = {
  text: '',
  placeholder: '',
  onUpdateText: null,
};

export default TextBox;
