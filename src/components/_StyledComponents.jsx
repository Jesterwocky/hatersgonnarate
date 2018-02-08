import styled from 'styled-components';

import { DARK, FIELD_SIZE_NORMAL } from '../util/themes';

const defaultTheme = { ...DARK, ...FIELD_SIZE_NORMAL };

export const Link = styled.a`
  color: orange;
  padding: 5px 10px;
`;

export const Button = styled.button`
  // padding results in square button when title is 1 character long
  margin-right: ${props => props.theme.buttonMargin || defaultTheme.buttonMargin}px;
  padding: 0 ${props => props.theme.buttonPadding || defaultTheme.buttonPadding}px;
  height: ${props => props.theme.fieldHeight || defaultTheme.fieldHeight}px;
  font-size: ${props => props.theme.fieldFontSize || defaultTheme.fieldFontSize}px;
  font-weight: 400;
  border: ${props => (props.theme.button || {}).border || 'none'};
  border-radius: 2px;
  background-color: ${props => (props.theme.button || {}).background || defaultTheme.button.background};
  color: ${props => ((props.theme || {}).button || {}).color || defaultTheme.button.color};

  &:hover {
    cursor: pointer;
  }
`;

export const List = styled.div`

`;

export const ListItem = styled.div`

`;

export const BlankListItem = styled.div`

`;
