import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { modalPadding } from '../../../util/constants.js';
import {
  ModalHeading3,
  ModalButton,
  Friend
} from '../_StyledComponents.jsx';

const NotSeenIt = styled.div.attrs({
  className: 'modal-addmovie-notseenit'
})`
  background-color: #cfe022;
  padding: 15px ${modalPadding};
  margin: 15px -${modalPadding};
`;
const NotSeenItHeading = ModalHeading3.extend.attrs({
  className: 'modal-addmovie-notseenit-heading'
})`
  color: #748000;
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
  box-shadow: none;
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

const NotSeenItOptions = ({ friendsInterested }) => (
  <NotSeenIt>
    <NotSeenItHeading>
      Havent seen it?
    </NotSeenItHeading>

    <NotSeenItContent>

      {friendsInterested && friendsInterested.length > 0 &&
        <InterestedFriends>
          These friends wanna watch it:
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
    </NotSeenItContent>
  </NotSeenIt>
);

NotSeenItOptions.propTypes = {
  friendsInterested: PropTypes.array
};

NotSeenItOptions.defaultProps = {
  friendsInterested: []
};

export default NotSeenItOptions;
