import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { buttonMinHeight } from '../util/constants.js';

const Field = styled.input.attrs({
  type: 'text',
  className: 'text-box'
})`
  flex: 1;
  box-sizing: border-box;
  min-height: ${buttonMinHeight};
  height: ${props => (props.height ? `${props.height}px` : 'auto')};
  width: 100%;
`;

const TextBox = ({ placeholder, onUpdateText }) => {
  function onChange(e) {
    if (typeof onUpdateText === 'function') {
      onUpdateText(e.currentTarget.value);
    }
  }

  return (
    <Field
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

TextBox.propTypes = {
  placeholder: PropTypes.string,
  onUpdateText: PropTypes.func
};

TextBox.defaultProps = {
  placeholder: '',
  onUpdateText: null
};

export default TextBox;
