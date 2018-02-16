import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MovieRating from '../movies/MovieRating/MovieRating';

const starsWidth = 60;

const MessageSenderInfoContainer = styled.div.attrs({
  className: 'messagesenderinfo',
})`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 5px;
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
  movieId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  picUrl: PropTypes.string,
};

MessageSenderInfo.defaultProps = {
  picUrl: '',
};

export default MessageSenderInfo;
