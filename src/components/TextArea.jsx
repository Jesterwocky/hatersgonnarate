import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DARK } from '../util/themes';

const defaultTheme = DARK;

const TextArea = styled.textarea.attrs({
  className: 'textarea',
  placeholder: props => props.placeholder,
  onChange: props => e => props.onUpdateText(e.currentTarget.value),
  value: props => props.text,
})`
  flex: 1;
  font-size: 16px;
  padding: 15px;
  border: none;
  border-radius: 2px;
  box-sizing: border-box;
  width: 100%;
  min-width: 100%; // prevent weird resizing (e.g., in chrome)
  min-height: 45px;
  height: ${props => (props.height ? `${props.height}px` : 'auto')};
  color: ${props => (props.theme.field || defaultTheme.field).color};
  background-color: ${props => (props.theme.field || defaultTheme.field).background};
`;

TextArea.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  onUpdateText: PropTypes.func.isRequired,
};

TextArea.defaultProps = {
  text: '',
  placeholder: '',
};

export default TextArea;
