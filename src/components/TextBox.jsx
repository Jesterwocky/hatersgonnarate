import PropTypes from 'prop-types';
import styled from 'styled-components';

import { buttonMinHeight } from '../util/constants';
import { DARK } from '../util/themes';

const defaultTheme = DARK;

const TextBox = styled.input.attrs({
  type: 'text',
  className: 'textbox',
  placeholder: props => props.placeholder,
  onChange: props => e => props.onUpdateText(e.currentTarget.value),
  value: props => props.text,
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
