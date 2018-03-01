import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, withTheme } from 'styled-components';

import { MESSAGE_THEMES } from '../../util/themes';

import MovieRating from '../movies/MovieRating/MovieRating';

const starsWidth = 75;
const marginBetweenInfoAndBubble = 8;
const defaultTheme = MESSAGE_THEMES.privateOrPublic;

const MessageSenderInfoContainer = styled.div.attrs({
  className: 'messagesenderinfo',
})`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-weight: 600;

  ${(props) => {
    const messagesRight = props.theme.messagesRight || defaultTheme.messagesRight;
    const messagesLeft = props.theme.messagesLeft || defaultTheme.messagesLeft;

    return props.isRightSideResponder ?
      css`
        color: ${messagesRight.color};
        margin-left: ${marginBetweenInfoAndBubble}px;
      ` :
      css`
        color: ${messagesLeft.color};
        margin-right: ${marginBetweenInfoAndBubble}px;
      `;
  }}
  `;

const PicContainer = styled.div.attrs({
  className: 'messagesenderinfo-pic',
})`
  border-radius: 100%;
  width: 25px;
  height: 25px;
  background-image: url(${props => props.url});
  background-size: contain;
  `;

const Username = styled.div.attrs({
  className: 'messagesenderinfo-username',
})``;

const MovieRatingContainer = styled.div.attrs({
  className: 'messagesenderinfo-rating',
})`
  margin-top: 3px;
  `;

// TODO: this is very similar to SeedParticipantSummary.
// Combine somehow or at least put files in same folder
const MessageSenderInfo = ({
  username,
  // userId,
  movieId,
  rating,
  picUrl,
  isRightSideResponder,
}) => (
  <MessageSenderInfoContainer isRightSideResponder={isRightSideResponder}>
    <PicContainer url={picUrl} />
    <Username>{username}</Username>
    <MovieRatingContainer>
      <MovieRating
        movieId={movieId}
        rating={rating}
        width={starsWidth}
      />
    </MovieRatingContainer>
  </MessageSenderInfoContainer>
);

MessageSenderInfo.propTypes = {
  username: PropTypes.string.isRequired,
  // userId: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  movieId: PropTypes.string,
  picUrl: PropTypes.string,
  isRightSideResponder: PropTypes.bool,
};

MessageSenderInfo.defaultProps = {
  movieId: '',
  picUrl: '',
  isRightSideResponder: false,
};

export default withTheme(MessageSenderInfo);
