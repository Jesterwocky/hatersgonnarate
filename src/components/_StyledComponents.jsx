import styled from 'styled-components';

import { DARK, FIELD_SIZE_NORMAL } from '../util/themes';

const defaultFieldSize = FIELD_SIZE_NORMAL;

export const Link = styled.a`
  color: orange;
  padding: 5px 10px;
`;

export const Button = styled.button`
  // padding results in square button when title is 1 character long
  margin-right: ${props => props.theme.buttonMargin || defaultFieldSize.buttonMargin}px;
  padding: 0 ${props => props.theme.buttonPadding || defaultFieldSize.buttonPadding}px;
  height: ${props => props.theme.fieldHeight || defaultFieldSize.fieldHeight}px;
  font-size: ${props => props.theme.fieldFontSize || defaultFieldSize.fieldFontSize}px;
  font-weight: 400;
  border: none;
  border-radius: 2px;
  background-color: ${DARK.button.background};
  color: white;

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
