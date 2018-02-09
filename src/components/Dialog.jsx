import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { modalBannerZIndex } from '../util/constants';
import { LIGHT } from '../util/themes';

import { Button } from './_StyledComponents';

const DialogContainer = styled.div.attrs({
  className: 'dialog',
})`
  z-index: ${modalBannerZIndex};
  position: relative;
`;

const DialogContent = styled.div.attrs({
  className: 'dialog-content',
})`
  padding: 30px;
  min-height: 145px;
  max-height: 245px;
  width: 315px;
  position: absolute;
  top: -350px;
  left: 23.5%;
  background-color: white;
  border: 1px solid ${LIGHT.color};
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const DialogText = styled.p.attrs({
  className: 'dialog-text',
})`
  margin-top: 0;
`;

const DialogOptions = styled.div.attrs({
  className: 'dialog-options',
})``;

const Dialog = ({ children, actions }) => (
  <DialogContainer>
    <DialogContent>
      <DialogText>
        {children}
      </DialogText>
      <DialogOptions>
        {actions.map(action => (
          <Button
            key={`option-${action.label}`}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </DialogOptions>
    </DialogContent>
  </DialogContainer>
);

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  actions: PropTypes.array.isRequired,
};

export default Dialog;
