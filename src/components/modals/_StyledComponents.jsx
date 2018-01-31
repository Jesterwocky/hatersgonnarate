import styled from 'styled-components';
import { Button } from '../_StyledComponents.jsx';

export const ModalTitle = styled.h1`
  margin-top: 0;
  font-size: 20px;
`;

export const ModalHeading2 = styled.h2.attrs({
  className: 'modal-heading2'
})``;

export const ModalHeading3 = styled.h3.attrs({
  className: 'modal-heading3'
})`
  margin-top: 0;
`;

export const ModalText = styled.p`

`;

export const ModalButton = Button.extend`
  font-size: 14px;
`;

export const Friend = styled.span.attrs({
  className: 'modal-addmovie-friendname'
})`
  background-color: white;
  padding: 5px 7px;
  margin: 0 5px;
`;
