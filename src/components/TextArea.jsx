import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DARK } from '../util/themes';

const defaultTheme = DARK;

const Area = styled.textarea`
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
  color: ${props => (props.theme.field || defaultTheme.field).color};
  background-color: ${props => (props.theme.field || defaultTheme.field).background};
`;

const TextArea = ({
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

  return (
    <Area
      className={`text-area ${className}`}
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
  className: PropTypes.string,
};

TextArea.defaultProps = {
  text: '',
  placeholder: '',
  onUpdateText: null,
  className: '',
};

export default TextArea;
