import styled from 'styled-components';
import { Button } from '../_StyledComponents';

import { LIGHT } from '../../util/themes';

export const ModalTitle = styled.h1`
  font-size: 20px;
  margin-top: -5px;
  margin-bottom: 10px;
`;

export const ModalHeading2 = styled.h2.attrs({
  className: 'modal-heading2',
})`
  margin: 20px 0 5px;
`;

export const ModalHeading3 = styled.h3.attrs({
  className: 'modal-heading3',
})`
  margin-top: 0;
`;

export const ModalText = styled.p`
  margin: 0;
`;

export const ModalButton = Button.extend`
  font-size: 14px;
  background-color: ${props => (props.disabled ? LIGHT.button.disabledBackground : '')};
`;

export const Friend = styled.span.attrs({
  className: 'modal-addmovie-friendname',
})`
  background-color: white;
  padding: 5px 7px;
  margin: 0 5px;
`;
