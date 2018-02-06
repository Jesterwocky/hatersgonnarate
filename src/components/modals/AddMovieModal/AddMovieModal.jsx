// TODO: move AddMovieModal directory under movies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { modalPadding } from '../../../util/constants';
import { hasItem } from '../../../util/helpers';

// import actions
import { closeModal } from '../../../actions/modals';
import {
  updateNewMovieRating,
  updateNewMovieRemarks,
  addNewMovie,
  clearNewRating,
  addFriendToTag,
  removeFriendToTag,
} from '../../../actions/unsavedData/newRating';
import { addMovieRating } from '../../../actions/movies';

// import styled components
import Modal from '../Modal';
import {
  ModalTitle,
  ModalHeading2,
  ModalHeading3,
  ModalText,
  ModalButton,
  ModalTextBox,
  ModalTextArea,
} from '../_StyledComponents';

// import components
import MovieRating from '../../movies/MovieRating/MovieRating';
import MovieSearch from '../../movies/MovieSearch';
import NotSeenItBanner from './NotSeenItBanner';
import SelectFriends from '../../SelectFriends';

// styled components
const AddMovie = styled(Modal).attrs({
  className: 'modal-add-movie',
})``;

const ForSelectedMovie = styled.div.attrs({
  className: 'modal-addmovie-forselectedmovie',
})``;

const MovieTitle = ModalHeading2.extend.attrs({
  className: 'modal-addmovie-title',
})`
  font-size: 30px;
  color: black;
  margin-bottom: 5px;
`;

const MovieBlurb = ModalText.extend.attrs({
  className: 'modal-addmovie-blurb',
})`
  margin-bottom: 15px;
`;

// TODO: only show add button if user opens model without searching
const ModalMovieSearch = styled(MovieSearch).attrs({
  className: 'modal-addmovie-search',
  // theme: themes.LIGHT,
})``;

const PromptText = ModalText.extend.attrs({
  className: 'modal-addmovie-prompt',
})`
  margin: 10px 0 5px;
`;

const RatingContainer = styled.div.attrs({
  className: 'modal-addmovie-rating-container',
})`
  display: flex;
  justify-content: center;
`;

const Rating = styled(MovieRating).attrs({
  className: 'modal-addmovie-rating-stars',
  width: 300, // needed by MovieRating to calc star width
  // theme: themes.LIGHT,
})``;

const RemarksContainer = styled.div.attrs({
  className: 'modal-addmovie-remarks',
})``;

const Remarks = ModalTextArea.extend.attrs({
  className: 'modal-addmovie-rating-stars',
  height: 75,
})``;

const TagFriendsContainer = styled.div`
  margin-top: 5px;,
`;

const TagFriends = styled(SelectFriends).attrs({
  className: 'modal-addmovie-tagfriends',
})``;

const ModalControls = styled.div.attrs({
  className: 'modal-addmovie-controls',
})`
  margin-top: ${modalPadding};
`;

// component
class AddMovieModal extends Component {
  state = {
    showNotSeenItBanner: false,
  }

  // TODO: better way to do this? sometimes get
  // errors about rendering in the middle of a render
  componentDidMount() {
    this.bannerTimer = setTimeout(() => {
      this.setState({
        showNotSeenItBanner: true,
      });
    }, 3000);
  }

  onSave = () => {
    const {
      selectedMovieId,
      ratingData,
      saveRating,
      close,
      clearRating,
    } = this.props;

    const {
      rating,
      remarks,
      taggedFriends,
    } = ratingData[selectedMovieId];

    saveRating(selectedMovieId, rating, remarks, taggedFriends);
    clearRating();
    close();
  }

  // TODO: use toggleFriendSelection action (to be added)
  // instead of checking here
  onToggleFriend = (friendKey) => {
    const {
      selectedMovieId,
      ratingData,
      tagFriend,
      untagFriend,
    } = this.props;

    const { taggedFriends } = ratingData[selectedMovieId];

    if (hasItem(taggedFriends, friendKey)) {
      untagFriend(friendKey);
    } else {
      tagFriend(friendKey);
    }
  }

  updateRatingAndStopBanner = (rating) => {
    if (this.bannerTimer) {
      clearTimeout(this.bannerTimer);
    }

    this.props.updateRating(rating);

    if (this.state.showNotSeenItBanner) {
      this.setState({
        showNotSeenItBanner: false,
      });
    }
  }

  closeNotSeenIt = () => {
    this.setState({
      showNotSeenItBanner: false,
    });
  }

  openNotSeenIt = () => {
    this.setState({
      showNotSeenItBanner: true,
    });
  }

  render() {
    const {
      selectedMovieId,
      ratingData,

      movies,

      updateRemarks,
      changeMovie,
    } = this.props;

    const {
      rating,
      remarks,
      contextualFriends = [],
      taggedFriends = [],
    } = ratingData[selectedMovieId] || {};

    const movie = movies[selectedMovieId];

    const friendsInterested = contextualFriends
      .filter(friend => friend.wantToSee);

    const savable = !!selectedMovieId && !!rating;

    // TODO: if select movie they already saw, indicate re-rating
    // and show different options (like no "not seen it")
    // TODO: allow friend search, and show friend suggestions in addition
    // to people who are interested in seeing the movie
    return (
      <AddMovie>
        {selectedMovieId && this.state.showNotSeenItBanner &&
          <NotSeenItBanner
            friendsInterested={friendsInterested}
            onClose={this.closeNotSeenIt}
          />
        }

        <ModalTitle>
          Rate Movie
        </ModalTitle>

        <ModalMovieSearch
          onConfirmSelection={changeMovie}
          showButton={!selectedMovieId}
        >
          change movie
        </ModalMovieSearch>

        {selectedMovieId &&
          <ForSelectedMovie>
            <MovieTitle>{movie.title}</MovieTitle>

            <MovieBlurb>
              {movie.blurb}
            </MovieBlurb>

            <RatingContainer>
              <Rating
                movieId={selectedMovieId}
                rating={rating}
                onUpdateRating={this.updateRatingAndStopBanner}
                canEdit
              />
            </RatingContainer>

            <RemarksContainer>
              <PromptText>
                What did you think?
              </PromptText>
              <Remarks
                onUpdateText={updateRemarks}
                text={remarks}
              />
            </RemarksContainer>

            <TagFriendsContainer>
              <PromptText>
                Select friends - let them know you rated {movie.title}
              </PromptText>
              <TagFriends
                friends={
                  Object.keys(contextualFriends).map(friendKey => ({
                    ...contextualFriends[friendKey],
                    // friendKey set explicitly in case friends
                    // in future are ordered by something other than id
                    // (like value indicating relevance in current context)
                    friendKey: contextualFriends[friendKey].id,
                    isSelected: hasItem(taggedFriends, friendKey),
                  }))
                }
                onToggle={this.onToggleFriend}
              />
            </TagFriendsContainer>

          </ForSelectedMovie>
        }

        <ModalControls>
          <ModalButton
            onClick={this.onSave}
            disabled={!savable}
          >
            Done
          </ModalButton>
        </ModalControls>

      </AddMovie>
    );
  }
}

// props
AddMovieModal.propTypes = {
  selectedMovieId: PropTypes.string,
  ratingData: PropTypes.object, // keys are movie IDs
  movies: PropTypes.object,

  updateRating: PropTypes.func.isRequired,
  updateRemarks: PropTypes.func.isRequired,
  clearRating: PropTypes.func.isRequired,
  changeMovie: PropTypes.func.isRequired,
  tagFriend: PropTypes.func.isRequired,
  untagFriend: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  saveRating: PropTypes.func.isRequired,
};

AddMovieModal.defaultProps = {
  selectedMovieId: '',
  ratingData: {},
  movies: {},
};

// connect and export
function mapStateToProps(state) {
  return {
    selectedMovieId: state.new.rating.selectedMovieId,
    ratingData: state.new.rating.data,
    movies: state.movies.movies,
  };
}

// TODO: add tagged friends to movie rating update
function mapDispatchToProps(dispatch) {
  return {
    updateRating: rating => updateNewMovieRating(dispatch, rating),
    updateRemarks: remarks => updateNewMovieRemarks(dispatch, remarks),
    tagFriend: friendKey => addFriendToTag(dispatch, friendKey),
    untagFriend: friendKey => removeFriendToTag(dispatch, friendKey),
    changeMovie: movieId => addNewMovie(dispatch, movieId),
    clearRating: () => clearNewRating(dispatch),
    close: () => closeModal(dispatch),
    saveRating: (movieId, rating, remarks) => (
      addMovieRating(dispatch, movieId, rating, remarks)
    ),
    getRelatedFriend: friendId => getFriendForNewRating(dispatch, friendId),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMovieModal);
