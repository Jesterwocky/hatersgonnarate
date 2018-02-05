// TODO: move AddMovieModal directory under movies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { modalPadding } from '../../../util/constants.js';
import { themes } from '../../../util/themes.js';
import { hasItem } from '../../../util/helpers.js';

// import actions
import { closeModal } from '../../../actions/modals/modals.js';
import {
  updateNewMovieRating,
  updateNewMovieRemarks,
  addNewMovie,
  clearNewRating,
  addFriendToTag,
  removeFriendToTag,
} from '../../../actions/modals/newRating.js';
import { addMovieRating } from '../../../actions/movies.js';

// import styled components
import Modal from '../Modal.jsx';
import {
  ModalTitle,
  ModalHeading2,
  ModalHeading3,
  ModalText,
  ModalButton,
  ModalTextBox,
  ModalTextArea,
} from '../_StyledComponents.jsx';

// import components
import MovieRating from '../../movies/MovieRating/MovieRating.jsx';
import MovieSearch from '../../movies/MovieSearch.jsx';
import NotSeenItBanner from './NotSeenItBanner.jsx';
import SelectFriends from '../../SelectFriends.jsx';

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
  theme: themes.LIGHT,
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
  theme: themes.LIGHT,
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
      movie,
      saveRating,
      close,
      clearRating,
      rating,
      remarks,
      taggedFriends,
    } = this.props;

    saveRating(movie.id, rating, remarks, taggedFriends);
    clearRating();
    close();
  }

  // TODO: use toggleFriendSelection action (to be added)
  // instead of checking here
  onToggleFriend = (friendKey) => {
    const { taggedFriends, tagFriend, untagFriend } = this.props;

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
      movie,
      rating,
      remarks,
      friends,
      taggedFriends,
      updateRemarks,
      changeMovie,
    } = this.props;
    const friendsInterested = ((movie.friends || {}).interested) || {};
    const savable = !!movie.id && !!rating;

    // TODO: if select movie they already saw, indicate re-rating
    // and show different options (like no "not seen it")
    // TODO: allow friend search, and show friend suggestions in addition
    // to people who are interested in seeing the movie
    return (
      <AddMovie>
        {movie.id && this.state.showNotSeenItBanner &&
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
          showButton={!movie.id}
        >
          change movie
        </ModalMovieSearch>

        <MovieTitle>{movie.title}</MovieTitle>

        <MovieBlurb>
          {movie.blurb}
        </MovieBlurb>

        {movie.id &&
          <ForSelectedMovie>

            <RatingContainer>
              <Rating
                movieId={movie.id}
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
                  Object.keys(friends)
                  .map(friendKey => ({
                    ...friends[friendKey],
                    // friendKey set explicitly in case friends
                    // in future are ordered by something other than id
                    // (like value indicating relevance in current context)
                    friendKey: friends[friendKey].id,
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
  movie: PropTypes.object,
  rating: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  remarks: PropTypes.string,
  friends: PropTypes.object,
  taggedFriends: PropTypes.array,
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
  movie: {},
  rating: null,
  remarks: '',
  friends: {},
  taggedFriends: [],
};

// connect and export
function mapStateToProps(state) {
  return {
    movie: state.newRating.movie,
    rating: state.newRating.rating,
    remarks: state.newRating.remarks,
    friends: state.newRating.friends,
    taggedFriends: state.newRating.taggedFriends,
  };
}

// TODO: add tagged friends to movie rating update
function mapDispatchToProps(dispatch) {
  return {
    updateRating: rating => updateNewMovieRating(dispatch, rating),
    updateRemarks: remarks => updateNewMovieRemarks(dispatch, remarks),
    tagFriend: friendKey => addFriendToTag(dispatch, friendKey),
    untagFriend: friendKey => removeFriendToTag(dispatch, friendKey),
    changeMovie: movie => addNewMovie(dispatch, movie),
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
