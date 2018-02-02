import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { themes } from '../../../util/constants.js';

// import actions
import { closeModal } from '../../../actions/modals/modals.js';
import {
  updateNewMovieRating,
  updateNewMovieRemarks,
  addNewMovie,
  clearNewRating
} from '../../../actions/modals/newRating.js';
import { updateMovieRating } from '../../../actions/movies.js';

// import styled components
import Modal from '../Modal.jsx';
import {
  ModalTitle,
  ModalHeading2,
  ModalHeading3,
  ModalText,
  ModalButton,
  ModalTextBox,
  ModalTextArea
} from '../_StyledComponents.jsx';

// import components
import MovieRating from '../../movies/MovieRating/MovieRating.jsx';
import AddMovieWithSearch from '../../movies/addMovie/AddMovieWithSearch.jsx';
import NotSeenItBanner from './NotSeenItBanner.jsx';
import SelectFriends from '../../SelectFriends.jsx';

// styled components
const AddMovie = styled(Modal).attrs({
  className: 'modal-add-movie'
})``;

const ForSelectedMovie = styled.div.attrs({
  className: 'modal-addmovie-forselectedmovie'
})``;

const MovieTitle = ModalHeading2.extend.attrs({
  className: 'modal-addmovie-title'
})`
  font-size: 30px;
  color: black;
  margin-bottom: 5px;
`;

const MovieBlurb = ModalText.extend.attrs({
  className: 'modal-addmovie-blurb'
})`
  margin-bottom: 15px;
`;

// TODO: only show add button if user opens model without searching
const ModalMovieSearch = styled(AddMovieWithSearch).attrs({
  className: 'modal-addmovie-search',
  theme: themes.LIGHT
})``;

const RatingContainer = styled.div.attrs({
  className: 'modal-addmovie-rating-container'
})`
  display: flex;
  justify-content: center;
`;

const Rating = styled(MovieRating).attrs({
  className: 'modal-addmovie-rating-stars',
  width: 300, // needed by MovieRating to calc star width
  theme: themes.LIGHT
})``;

const RemarksContainer = styled.div.attrs({
  className: 'modal-addmovie-remarks'
})``;

const Remarks = ModalTextArea.extend.attrs({
  className: 'modal-addmovie-rating-stars',
  height: 75
})``;

const ModalControls = styled.div.attrs({
  className: 'modal-addmovie-controls'
})``;

// component
class AddMovieModal extends Component {
  state = {
    showNotSeenItBanner: false
  }

  componentDidMount() {
    this.bannerTimer = setTimeout(() => {
      this.setState({
        showNotSeenItBanner: true
      });
    }, 3000);
  }

  onSave = () => {
    const {
      movie,
      save,
      close,
      rating,
      remarks,
      taggedFriends
    } = this.props;

    save(movie.id, { rating, remarks, taggedFriends });
    close();
  }

  updateRatingAndStopBanner = (rating) => {
    if (this.bannerTimer) {
      clearTimeout(this.bannerTimer);
    }

    this.props.updateRating(rating);

    if (this.state.showNotSeenItBanner) {
      this.setState({
        showNotSeenItBanner: false
      });
    }
  }

  closeNotSeenIt = () => {
    this.setState({
      showNotSeenItBanner: false
    });
  }

  openNotSeenIt = () => {
    this.setState({
      showNotSeenItBanner: true
    });
  }

  render() {
    const {
      movie,
      rating,
      remarks,
      taggedFriends,
      updateRemarks,
      changeMovie,
      tagFriend,
      untagFriend
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
        />

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
              <ModalText>
                What did you think?
              </ModalText>
              <Remarks
                onUpdateText={updateRemarks}
                text={remarks}
              />
            </RemarksContainer>

            <SelectFriends
              friends={
                Object.keys(movie.friends.interested)
                .map(key => movie.friends.interested[key])
              }
              taggedFriends={taggedFriends}
              onSelectFriend={tagFriend}
              onUnselectFriend={untagFriend}
            />

          </ForSelectedMovie>
        }

        <ModalControls>
          <ModalButton
            onClick={this.onSave}
            disabled={savable}
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
  save: PropTypes.func.isRequired
};

AddMovieModal.defaultProps = {
  movie: {},
  rating: null,
  remarks: '',
  friends: {},
  taggedFriends: []
};

// connect and export
function mapStateToProps(state) {
  return {
    movie: state.newRating.movie,
    rating: state.newRating.rating,
    remarks: state.newRating.remarks,
    friends: state.newRating.friends,
    taggedFriends: state.newRating.taggedFriends
  };
}

// TODO: add tagged friends to movie rating update
function mapDispatchToProps(dispatch) {
  return {
    updateRating: rating => updateNewMovieRating(dispatch, rating),
    updateRemarks: remarks => updateNewMovieRemarks(dispatch, remarks),
    tagFriend: remarks => addFriendToTag(dispatch, friend),
    untagFriend: remarks => removeFriendToTag(dispatch, friend),
    changeMovie: movie => addNewMovie(dispatch, movie),
    clearRating: () => clearNewRating(dispatch),
    close: () => closeModal(dispatch),
    save: (movieId, rating, remarks) => (
      updateMovieRating(dispatch, movieId, rating, remarks)
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMovieModal);
