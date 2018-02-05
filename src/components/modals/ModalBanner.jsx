import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { modalBannerZIndex } from '../../util/constants.js';

import { GREEN_BANNER } from '../../util/themes.js';

const defaultTheme = GREEN_BANNER;

const Banner = styled.div.attrs({
  className: 'modal-banner',
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

  background-color: ${props => props.theme.background || defaultTheme.background};
  color: ${props => props.theme.color || defaultTheme.color};
`;

const CloseButton = styled.button.attrs({
  className: 'modal-banner-closeicon',
})`
  position: absolute;
  top: 7px;
  left: 7px;

  border: none;
  color: ${props => props.theme.color || defaultTheme.color};
  background-color: transparent;

  font-size: 18px;
  font-weight: 600;

  &:hover: {
    cursor: pointer;
  }
`;

const Content = styled.div.attrs({
  className: 'modal-banner-content',
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
  children: PropTypes.node,
};

ModalBanner.defaultProps = {
  children: null,
};

export default ModalBanner;
