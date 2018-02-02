import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  modalPadding,
  buttonColor,
  greenBanner
} from '../../../util/constants.js';
import {
  ModalHeading3,
  ModalButton,
  Friend
} from '../_StyledComponents.jsx';

const NotSeenIt = styled.div.attrs({
  className: 'modal-addmovie-notseenit'
})`
  background-color: ${greenBanner['background-color']};
  color: ${greenBanner.color};
  padding: 15px 50px;
  margin: 15px -${modalPadding};
  position: relative; // to position close icon
`;
const NotSeenItHeading = ModalHeading3.extend.attrs({
  className: 'modal-addmovie-notseenit-heading'
})`
  font-style: italic;
  margin: 0 0 15px;
`;
const NotSeenItContent = styled.div`
  margin-left: 30px;
`;
const SeeItButtons = styled.div`
  color: white;
`;
const SeeItButton = ModalButton.extend`
  background-color: transparent;
  color: white;
  padding: 0;
  margin-left: 0;
  margin-right: 20px;
`;
const InterestedFriends = styled.div.attrs({
  className: 'modal-addmovie-friendsInterested'
})`
  font-size: 12px;
  margin-bottom: 10px;
`;

const InterestedFriend = Friend.extend.attrs({
  className: 'modal-addmovie-friendname'
})`
  background-color: white;
  padding: 5px 7px;
  margin: 0 5px;
`;

const CloseButton = styled.button`
  border: none;
  color: ${greenBanner.color};
  background-color: transparent;
  font-size: 18px;
  font-weight: 600;
  position: absolute;
  top: 7px;
  left: 7px;
`;

const NotSeenItOptions = ({ friendsInterested }) => (
  <NotSeenIt>
    <CloseButton onClick={() => console.log("clooooose")}>
      x
    </CloseButton>
    <NotSeenItHeading>
      Havent seen it?
      {' '}
      {friendsInterested && friendsInterested.length > 0 &&
        'These friends wanna watch it:'
      }
    </NotSeenItHeading>

    {friendsInterested && friendsInterested.length > 0 &&
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
  </NotSeenIt>
);

NotSeenItOptions.propTypes = {
  friendsInterested: PropTypes.array
};

NotSeenItOptions.defaultProps = {
  friendsInterested: []
};

export default NotSeenItOptions;
