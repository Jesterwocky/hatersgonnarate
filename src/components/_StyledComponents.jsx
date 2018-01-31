import styled from 'styled-components';

import { buttonColor, buttonMinHeight, buttonBoxShadow } from '../util/constants.js';

export const Link = styled.a`
  color: orange;
  padding: 5px 10px;
`;

export const Button = styled.button`
  min-width: 65px;
  border: none;
  border-radius: 2px;
  padding: 10px 7px;
  background-color: ${buttonColor};
  color: white;
  margin: 5px;
  min-height: ${buttonMinHeight};
  box-shadow: ${buttonBoxShadow};
`;

export const List = styled.div`

`;

export const ListItem = styled.div`

`;

export const BlankListItem = styled.div`

`;
