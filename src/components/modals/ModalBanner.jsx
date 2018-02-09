import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { modalBannerZIndex } from '../../util/constants';

import { GREEN, BANNER } from '../../util/themes';

const defaultTheme = {
  ...GREEN,
  ...BANNER.THIN,
  ...BANNER.TOP,
};

const Banner = styled.div`
  z-index: ${modalBannerZIndex};
  box-sizing: border-box;
  width: 100%;
  height: ${props => (props.theme || defaultTheme).bannerThickness}px;
  padding: 15px 50px;

  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${props => (props.theme || defaultTheme).bannerDistanceFromTop}px;
  left: 0;

  background-color: ${props => (props.theme || defaultTheme).background};
  color: ${props => (props.theme || defaultTheme).color};
`;

const CloseButton = styled.button.attrs({
  className: 'modal-banner-closeicon',
})`
  position: absolute;
  top: 10px;
  left: 10px;

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

const ModalBanner = ({ onClose, children, className }) => (
  <Banner className={`modal-banner ${className}`}>
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
  className: PropTypes.string,
};

ModalBanner.defaultProps = {
  children: null,
  className: '',
};

export default ModalBanner;
