import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, withTheme } from 'styled-components';

import { MESSAGE_THEMES } from '../../util/themes';

import MovieRating from '../movies/MovieRating/MovieRating';

const starsWidth = 60;
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
        margin-left: 4%;
      ` :
      css`
        color: ${messagesLeft.color};
        margin-right: 4%;
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
})``;

const MessageSenderInfo = ({
  username,
  userId,
  movieId,
  rating,
  picUrl,
}) => {
  // TODO: this is very similar to SeedParticipantSummary.
  // Combine somehow or at least put files in same folder
  return (
    <MessageSenderInfoContainer>
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
};

MessageSenderInfo.propTypes = {
  username: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  movieId: PropTypes.string,
  picUrl: PropTypes.string,
};

MessageSenderInfo.defaultProps = {
  movieId: '',
  picUrl: '',
};

export default withTheme(MessageSenderInfo);