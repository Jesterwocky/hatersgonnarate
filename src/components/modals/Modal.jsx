import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import {
  modalPadding,
  modalZIndex,
  modalContentZIndex,
} from '../../util/constants';

import { LIGHT } from '../../util/themes';

import { closeModal } from '../../actions/modals';

const Container = styled.div.attrs({
  className: 'modal-container',
})`
  position: fixed;
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: ${modalPadding};
  box-sizing: border-box;
`;

const Overlay = styled.div.attrs({
  className: 'modal-overlay',
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.8;
  z-index: ${modalZIndex};
`;

const ModalContent = styled.div.attrs({
  className: 'modal-content',
})`
  background-color: white;
  color: ${props => props.theme.color};
  margin: auto;
  width: 60vw;
  min-width: 700px;
  max-width: 915px;
  padding: ${modalPadding};
  border-radius: 15px;
  z-index: ${modalContentZIndex};
  position: relative; // to position banner
`;

const Modal = ({ children, close }) => (
  <ThemeProvider theme={LIGHT}>
    <Container>
      <Overlay onClick={close} />
      <ModalContent>
        {children}
      </ModalContent>
    </Container>
  </ThemeProvider>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    close: () => closeModal(dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Modal);
