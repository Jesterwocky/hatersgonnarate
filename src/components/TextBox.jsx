import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DARK, FIELD_SIZE_NORMAL } from '../util/themes';

const defaultTheme = { ...DARK, ...FIELD_SIZE_NORMAL };

const TextBox = styled.input.attrs({
  type: 'text',
  className: 'textbox',
  placeholder: props => props.placeholder,
  onChange: props => e => props.onUpdateText(e.currentTarget.value),
  value: props => props.text,
})`
  flex: 1;
  font-size: 14px;
  border: none;
  border-radius: 2px;
  box-sizing: border-box;
  width: 100%;
  color: ${props => (props.theme.field || defaultTheme.field).color};
  background-color: ${props => (props.theme.field || defaultTheme.field).background};
  font-size: ${props => props.theme.fieldFontSize || defaultTheme.fieldFontSize}px;
  height: ${props => props.theme.fieldHeight || defaultTheme.fieldHeight}px;
  padding: 0 ${props => props.theme.buttonPadding || defaultTheme.buttonPadding}px;
  margin-right: ${props => props.theme.buttonMargin || defaultTheme.buttonMargin}px;

  &::placeholder {
    // TODO: darken dark color and lighten light color using percents
    color: ${props => (props.theme.field || defaultTheme.field).placholderColor}
  }
`;

TextBox.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  onUpdateText: PropTypes.func.isRequired,
};

TextBox.defaultProps = {
  text: '',
  placeholder: '',
};

export default TextBox;
