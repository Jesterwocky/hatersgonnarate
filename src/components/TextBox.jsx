import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { buttonMinHeight } from '../util/constants.js';
import {
  DARK,
  LIGHT,
  themes,
} from '../util/themes.js';

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
  color: ${DARK.color};
  background-color: ${DARK.header.background};

  &::placeholder {
    color: #56558c; // TODO: darken DARK.color
  }

  ${props => props.theme === themes.LIGHT && css`
    color: ${LIGHT.field.color};
    background-color: ${LIGHT.field.background}

    &::placeholder {
      color: #d4d4f3; // TODO: lighten DARK.color
    }
  `}
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
  theme: PropTypes.string,
};

TextBox.defaultProps = {
  text: '',
  placeholder: '',
  onUpdateText: null,
  theme: '',
};

export default TextBox;
