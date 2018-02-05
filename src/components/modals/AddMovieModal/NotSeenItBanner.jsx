import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  ModalHeading3,
  ModalButton,
  Friend,
} from '../_StyledComponents.jsx';

import ModalBanner from '../ModalBanner.jsx';

const BannerHeading = ModalHeading3.extend.attrs({
  className: 'modal-addmovie-notseenit-heading',
})`
  font-style: italic;
  margin: 0 0 5px;
  display: inline;
`;

const InterestedFriends = styled.div.attrs({
  className: 'modal-addmovie-friendsInterested',
})`
  font-size: 12px;
  margin-bottom: 5px;
  display: inline;
  position: relative;
  top: -3px;
`;

const InterestedFriend = Friend.extend.attrs({
  className: 'modal-addmovie-friendname',
})`
  background-color: white;
  padding: 5px 7px;
  margin: 0 5px;
  display: inline-block;
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

const NotSeenItBanner = ({ friendsInterested, onClose }) => (
  <ModalBanner onClose={onClose}>
    <BannerHeading>
      Not seen it? {friendsInterested.length > 0 && 'These friends wanna watch it:'}
      {' '}
    </BannerHeading>
    {friendsInterested.length > 0 &&
      <InterestedFriends>
        {friendsInterested.map(friend => (
          <InterestedFriend key={`friend-${friend.id}`}>
            {friend.username}
          </InterestedFriend>
        ))}
      </InterestedFriends>
    }

    <SeeItButtons>
      <SeeItButton>Ask who’s interested</SeeItButton>
      <SeeItButton>Schedule movie night</SeeItButton>
      <SeeItButton>Watch online</SeeItButton>
    </SeeItButtons>
  </ModalBanner>
);

NotSeenItBanner.propTypes = {
  friendsInterested: PropTypes.array,
  onClose: PropTypes.func.isRequired,
};

NotSeenItBanner.defaultProps = {
  friendsInterested: [],
};

export default NotSeenItBanner;
