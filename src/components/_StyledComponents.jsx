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
  min-width: 65px;
  border: none;
  border-radius: 2px;
  padding: 9px 7px;
  background-color: ${DARK.button.background};
  color: white;
  min-height: ${buttonMinHeight};

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

// export const Friend = styled.div.attrs({
//   className: 'modal-addmovie-friendname'
// })`
//   background-color: white;
//   padding: 5px 7px;
//   margin: 0 5px;
// `;
