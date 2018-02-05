import styled from 'styled-components';
import { Button } from '../_StyledComponents';
import TextBox from '../TextBox';
import TextArea from '../TextArea';

import { themes, LIGHT } from '../../util/themes';

export const ModalTitle = styled.h1`
  margin-top: 0;
  font-size: 20px;
`;

export const ModalHeading2 = styled.h2.attrs({
  className: 'modal-heading2',
})``;

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
  background-color: ${props => (props.disabled ? LIGHT.field.background : '')};
`;

export const Friend = styled.span.attrs({
  className: 'modal-addmovie-friendname',
})`
  background-color: white;
  padding: 5px 7px;
  margin: 0 5px;
`;

export const ModalTextBox = styled(TextBox).attrs({
  className: 'modal-textbox',
  theme: themes.LIGHT,
})``;

export const ModalTextArea = styled(TextArea).attrs({
  className: 'modal-textarea',
  theme: themes.LIGHT,
})``;
