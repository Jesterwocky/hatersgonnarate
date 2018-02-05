import React, { Component } from 'react';
import styled from 'styled-components';

import { defaultStarSize } from '../../../util/constants';

import MovieRating from './MovieRating';

const ReRating = styled.div`
  width: 100px;
  min-height: 100px;
`;

const ReRateHeading = styled.h1`
  margin-top: 0;
`;

const ReRateSubHeading = styled.h2`
  margin-top: 0;
`;

const History = styled.div`
`;

const HistoryItem = styled.div`
  display: flex;
  flex-wrap: no-wrap;
`;

const RerateTime = styled.span`
  font-style: italic;
`;

const RerateContext = styled.p``;

const Remarks = styled.div``;

const reasonPlaceholderText = `Saw it again sober...
Realized I just like watching Chris Hemsworth...
Liked it better as an adult...
Left the cult that told me to like this movie...
Gotta speak my truth...`;

class MovieReRating extends Component {
  updateRemarks = (event) => {
    const remarks = event.currentTarget.value;
    const { updateReRate, movieId } = this.props;

    updateReRate({
      movieId,
      remarks
    });
  }

  render() {
    const {
      movieId,
      movieName,
      currentRating,
      previousRatings
    } = this.sprops;

    return (
      <ReRating>
        <ReRateHeading>Re-rating {movieName}</ReRateHeading>
        <MovieRating
          canEdit
          className="movie-ratings-rating-starscontainer"
          movieId={movieId}
          rating={currentRating}
          ratingWidth={defaultStarSize}
          updateRating={() => console.log('UPDATE!')}
        />
        <History>
          {previousRatings.map(pastRating => (
            <HistoryItem key={`pastRating-${movieId}`}>
              <RerateTime>pastRating.dateTime</RerateTime>

              {pastRating.remarks &&
                <RerateContext>
                  &quot;{pastRating.remarks}&quot;
                </RerateContext>
              }
              {!pastRating.remarks && pastRating.context &&
                <RerateContext>
                  {pastRating.context}
                </RerateContext>
              }

            </HistoryItem>
          ))}
        </History>
        <Remarks>
          <ReRateSubHeading>Sooo... What's changed?</ReRateSubHeading>
          <input
            type="text"
            name="why-text"
            value={reasonPlaceholderText}
            onChange={updateRemarks}
          />

        </Remarks>
      </ReRating>
    );
  }
}

const MovieReRating = ({
  movieId,
  movieName,
  currentRating,
  previousRatings,
}) => (
  <ReRating>
    <p>Re-rating {movieName}</p>
    <MovieRating
      canEdit
      className="movie-ratings-rating-starscontainer"
      movieId={movieId}
      rating={currentRating}
      ratingWidth={defaultStarSize}
      updateRating={() => console.log('UPDATE!')}
    />
    <History>
      {previousRatings.map(pastRating => (
        <HistoryItem key={`pastRating-${movieId}`}>
          <RerateTime>pastRating.dateTime</RerateTime>

          {pastRating.remarks &&
            <RerateContext>
              &quot;{pastRating.remarks}&quot;
            </RerateContext>
          }
          {!pastRating.remarks && pastRating.context &&
            <RerateContext>
              {pastRating.context}
            </RerateContext>
          }

        </HistoryItem>
      ))}
    </History>
    <Remarks>
      <ReRateSubHeading>Sooo... What's changed?</ReRateSubHeading>
      <input
        type="text"
        name="why-text"
        value={reasonPlaceholderText}
        onChange={updateRemarks}
      />

    </Remarks>
  </ReRating>
);

export default MovieReRating;
