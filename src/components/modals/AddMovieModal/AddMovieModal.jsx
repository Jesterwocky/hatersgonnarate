// TODO: move AddMovieModal directory under movies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import { modalPadding } from '../../../util/constants';
import { hasItem } from '../../../util/helpers';
import { FIELD_SIZE_SMALL, FIELD_SIZE_NORMAL, DARK, BANNER } from '../../../util/themes';

// import actions
import { closeModal } from '../../../actions/modals';
import {
  updateNewMovieRating,
  updateNewMovieRemarks,
  addNewMovie,
  clearNewRating,
  addFriendToTag,
  removeFriendToTag,
  addAndTagContextualFriend,
  usePreviousRating,
  clearPreviousRating,
} from '../../../actions/unsavedData/newRating';
import { addMovieRating } from '../../../actions/movies';

// import styled components
import Modal from '../Modal';
import {
  ModalTitle,
  ModalHeading2,
  ModalText,
  ModalButton,
} from '../_StyledComponents';
import TextArea from '../../TextArea';

// import components
import MovieRating from '../../movies/MovieRating/MovieRating';
import MovieSearch from '../../movies/MovieSearch';
import NotSeenItBanner from './NotSeenItBanner';
import SelectFriends from '../../SelectFriends';
import FriendSearch from '../../friends/FriendSearch';
import PreviousRatingDialog from './PreviousRatingDialog';

// styled components
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

const ModalMovieSearchContainer = styled.div.attrs({
  className: 'modal-addmovie-searchcontainer',
})`
  margin-bottom: ${props => (props.modalContainsOnlySearch ? '15px' : '0')}
`;

const PromptText = ModalText.extend.attrs({
  className: 'modal-addmovie-prompt',
})`
  margin: 10px 0 5px;
`;

const RemarksPromptText = PromptText.extend`
  margin-top: 3px;
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
})``;

const RemarksContainer = styled.div.attrs({
  className: 'modal-addmovie-remarkscontainer',
})``;

const Remarks = TextArea.extend.attrs({
  className: 'modal-addmovie-remarks',
})`
  height: 75px;
`;

const TagFriendsContainer = styled.div.attrs({
  className: 'modal-addmovie-tagfriends-container',
})`
  margin-top: 5px;
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
`;

const TagFriends = styled.div.attrs({
  className: 'modal-addmovie-tagfriends-friends',
})`
  display: flex;
`;

const FriendsSearchContainer = styled.div.attrs({
  className: 'modal-addmovie-tagfriends-friendssearch',
})`
  width: 230px;
  margin-right: 10px;
`;

const ModalControls = styled.div.attrs({
  className: 'modal-addmovie-controls',
})`
  margin-top: ${modalPadding - 10}px;
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

  rateDifferentMovie = (movie) => {
    if (!movie || !movie.id) return;
    this.props.changeMovie(movie.id);
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
      addAndTagFriend,
      usePrevRating,
      clearPrevRating,
    } = this.props;

    const {
      rating,
      remarks,
      contextualFriends = [],
      taggedFriends = [],
      previousNewRating = {},
    } = ratingData[selectedMovieId] || {};

    function onFind(friend) {
      if (Object.keys(friend).length === 0) return;
      addAndTagFriend(friend);
    }

    const movie = movies[selectedMovieId];
    const friendsInterested = contextualFriends
      .filter(friend => friend.wantToSee);
    const savable = !!selectedMovieId && !!rating;

    // TODO: if select movie they already saw, indicate re-rating
    // and show different options (like no "not seen it")
    // TODO: allow friend search, and show friend suggestions in addition
    // to people who are interested in seeing the movie
    return (
      <Modal className="modal-add-movie">
        {!!selectedMovieId && this.state.showNotSeenItBanner &&
          <ThemeProvider theme={BANNER.BOTTOM}>
            <NotSeenItBanner
              friends={friendsInterested}
              onClose={this.closeNotSeenIt}
            />
          </ThemeProvider>
        }

        <ModalTitle>
          Rate Movie
        </ModalTitle>

        <ThemeProvider theme={selectedMovieId ? FIELD_SIZE_SMALL : FIELD_SIZE_NORMAL}>
          <ModalMovieSearchContainer modalContainsOnlySearch={!selectedMovieId}>
            <MovieSearch
              onMovieFound={this.rateDifferentMovie}
              confirmOnSelect={!selectedMovieId}
              showButton={!!selectedMovieId}
              giveExtraSpace={!selectedMovieId}
            >
              change movie
            </MovieSearch>
          </ModalMovieSearchContainer>
        </ThemeProvider>

        {!!selectedMovieId &&
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
              <RemarksPromptText>
                What did you think?
              </RemarksPromptText>
              <Remarks
                onUpdateText={updateRemarks}
                text={remarks}
              />
            </RemarksContainer>

            <TagFriendsContainer show={!!rating}>
              <PromptText>
                Select friends - let them know you rated {movie.title}
              </PromptText>

              <TagFriends>

                <ThemeProvider theme={FIELD_SIZE_SMALL}>
                  <FriendsSearchContainer>
                    <FriendSearch
                      onFriendFound={onFind}
                    />
                  </FriendsSearchContainer>
                </ThemeProvider>

                <SelectFriends
                  friends={
                    contextualFriends.map(friend => ({
                      ...friend,
                      isSelected: hasItem(taggedFriends, friend.id),
                    }))
                  }
                  onToggle={this.onToggleFriend}
                />

              </TagFriends>

            </TagFriendsContainer>

            <ModalControls>
              <ModalButton
                onClick={this.onSave}
                disabled={!savable}
                theme={DARK.button}
              >
                Done
              </ModalButton>
            </ModalControls>
          </ForSelectedMovie>
        }
        {(previousNewRating.rating || previousNewRating.remarks) &&
          <PreviousRatingDialog
            onClose={clearPrevRating}
            continueFromPreviousRating={usePrevRating}
          />
        }
      </Modal>
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
  addAndTagFriend: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  saveRating: PropTypes.func.isRequired,
  usePrevRating: PropTypes.func.isRequired,
  clearPrevRating: PropTypes.func.isRequired,
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
    clearPrevRating: movieId => clearPreviousRating(dispatch, movieId),
    usePrevRating: movieId => usePreviousRating(dispatch, movieId),
    updateRating: rating => updateNewMovieRating(dispatch, rating),
    updateRemarks: remarks => updateNewMovieRemarks(dispatch, remarks),
    tagFriend: friendKey => addFriendToTag(dispatch, friendKey),
    untagFriend: friendKey => removeFriendToTag(dispatch, friendKey),
    addAndTagFriend: friend => addAndTagContextualFriend(dispatch, friend),
    changeMovie: movieId => addNewMovie(dispatch, movieId),
    clearRating: () => clearNewRating(dispatch),
    close: () => closeModal(dispatch),
    saveRating: (movieId, rating, remarks) => (
      addMovieRating(dispatch, movieId, rating, remarks)
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMovieModal);
