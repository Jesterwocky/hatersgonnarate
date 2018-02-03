import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  modalBannerZIndex,
  greenBanner
} from '../../util/constants.js';

const Banner = styled.div.attrs({
  className: 'modal-banner'
})`
  z-index: ${modalBannerZIndex};
  box-sizing: border-box;
  width: 100%;
  height: 95px;
  padding: 15px 50px;

  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 15px;
  left: 0;

  background-color: ${greenBanner['background-color']};
  color: ${greenBanner.color};
`;

const CloseButton = styled.button.attrs({
  className: 'modal-banner-closeicon'
})`
  position: absolute;
  top: 7px;
  left: 7px;

  border: none;
  color: ${greenBanner.color};
  background-color: transparent;

  font-size: 18px;
  font-weight: 600;

  &:hover: {
    cursor: pointer;
  }
`;

const Content = styled.div.attrs({
  className: 'modal-banner-content'
})``;

const ModalBanner = ({ onClose, children }) => (
  <Banner>
    <CloseButton onClick={onClose}>
      x
    </CloseButton>
    <Content>
      {children}
    </Content>
  </Banner>
);

ModalBanner.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
};

ModalBanner.defaultProps = {
  children: null
};

export default ModalBanner;
