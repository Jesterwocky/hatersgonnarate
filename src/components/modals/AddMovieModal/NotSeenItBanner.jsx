import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import {
  ModalHeading3,
  ModalButton,
  Friend,
} from '../_StyledComponents';

import { GREEN, BANNER } from '../../../util/themes';
import ModalBanner from '../ModalBanner';

// STYLED COMPONENTS
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
  <ThemeProvider theme={{ ...GREEN, ...BANNER.WIDE_CENTERED }}>
    <ModalBanner
      className="banner-notseenit"
      onClose={onClose}
    >
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
    </ModalBanner>
  </ThemeProvider>
);

// PROPS AND EXPORT
NotSeenItBanner.propTypes = {
  onClose: PropTypes.func.isRequired,
  friends: PropTypes.array,
};

NotSeenItBanner.defaultProps = {
  friends: [],
};

export default NotSeenItBanner;
