import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { modalZIndex, modalContentZIndex } from '../../util/constants.js';

import { closeModal } from '../../actions/modals/modals.js';

const Container = styled.div.attrs({
  className: 'modal-container'
})`
  position: fixed;
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const Overlay = styled.div.attrs({
  className: 'modal-overlay'
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
  className: 'modal-content'
})`
  margin: auto;
  width: 60vw;
  min-width: 700px;
  max-width: 915px;
  background-color: white;
  padding: 45px;
  z-index: ${modalContentZIndex};
`;

const Modal = ({ children, close }) => (
  <Container>
    <Overlay onClick={close} />
    <ModalContent>
      {children}
    </ModalContent>
  </Container>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    close: () => closeModal(dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Modal);
