import styled from 'styled-components';

import { buttonMinHeight } from '../util/constants';
import { DARK } from '../util/themes';

export const Link = styled.a`
  color: orange;
  padding: 5px 10px;
`;

export const Button = styled.button`
  font-size: 14px;
  font-weight: 400;
  border: none;
  border-radius: 2px;
  padding: 0 15px; // results in square button when title is 1 character long
  background-color: ${DARK.button.background};
  color: white;
  height: ${buttonMinHeight};

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
