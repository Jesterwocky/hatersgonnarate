import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { buttonMinHeight } from '../util/constants';
import { DARK } from '../util/themes';

const defaultTheme = DARK;

const Field = styled.input.attrs({
  type: 'text',
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
  className,
}) => {
  function onChange(e) {
    if (typeof onUpdateText === 'function') {
      onUpdateText(e.currentTarget.value);
    }
  }

  // TODO: for all shared regular components, make it so you don't need to wrap
  // them to make them styled OR at least don't have to explicitly pass the
  // className like you see here
  return (
    <Field
      className={`text-box ${className}`}
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
  className: PropTypes.string,
};

TextBox.defaultProps = {
  text: '',
  placeholder: '',
  onUpdateText: null,
  className: '',
};

export default TextBox;
