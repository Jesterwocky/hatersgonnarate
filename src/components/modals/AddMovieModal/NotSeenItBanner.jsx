import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import {
  ModalBanner,
  BannerCloseButton,
  ModalHeading3,
  ModalButton,
  Friend,
} from '../_StyledComponents';

import { GREEN_BANNER } from '../../../util/themes';
import { ModalBanner, BannerCloseButton } from '../ModalBanner';

// STYLED COMPONENTS
const Banner = ModalBanner.extend.attrs({
  className: 'modal-addmovie-notseenit',
})`
  height: 130px;
  top: 200px;
`;

const BannerHeading = ModalHeading3.extend.attrs({
  className: 'modal-addmovie-notseenit-heading',
})`
  font-style: italic;
  margin: 0 0 5px;
  display: inline;
`;

const Friends = styled.div.attrs({
  className: 'modal-addmovie-friends',
})`
  font-size: 12px;
  margin-bottom: 5px;
  display: inline;
  position: relative;
  top: -3px;
`;

const SeeItButtons = styled.div`
  color: white;
  text-align: center;
`;

const SeeItButton = ModalButton.extend`
  background-color: transparent;
  color: white;
  padding: 0;
  margin-left: 0;
  margin-right: 20px;
  height: 30px;
  min-height: unset;
`;

// COMPONENT
const NotSeenItBanner = ({ friends, onClose }) => (
  <ThemeProvider theme={GREEN_BANNER}>
    <Banner>
      <BannerHeading>
        Not seen it? {friends.length > 0 && 'These friends wanna watch it:'}
        {' '}
      </BannerHeading>

      {friends.length > 0 &&
        <Friends>
          {friends.map(friend => (
            <Friend key={`friend-${friend.id}`}>
              {friend.username}
            </Friend>
          ))}
        </Friends>
      }

      <SeeItButtons>
        <SeeItButton>Ask who’s interested</SeeItButton>
        <SeeItButton>Schedule movie night</SeeItButton>
        <SeeItButton>Watch online</SeeItButton>
      </SeeItButtons>
    </Banner>
  </ThemeProvider>
);

// PROPS AND EXPORT
NotSeenItBanner.propTypes = {
  friends: PropTypes.array,
  onClose: PropTypes.func.isRequired,
};

NotSeenItBanner.defaultProps = {
  friends: [],
};

export default NotSeenItBanner;
