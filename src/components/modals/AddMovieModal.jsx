import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { isEmpty } from '../../util/helpers.js';
import { closeModal } from '../../actions/modals/modals.js';
import {
  updateNewMovieRating,
  updateNewMovieRemarks,
  addNewMovie,
  clearNewRating
} from '../../actions/modals/newRating.js';
import { updateMovieRating } from '../../actions/movies.js';

import Modal from './Modal.jsx';
import { ModalTitle } from './_StyledComponents.jsx';
import { Button } from '../_StyledComponents.jsx';
import TextBox from '../TextBox.jsx';
import MovieRating from '../movies/MovieRating/MovieRating.jsx';
import AddMovieWithSearch from '../movies/addMovie/AddMovieWithSearch.jsx';

// search
// rate
// explain

// once saved...
// see what friends have said
// and call them out if you want

const AddMovie = styled(Modal).attrs({
  className: 'modal-add-movie'
})``;
const ForSelectedMovie = styled.div.attrs({
  className: 'modal-addmovie-forselectedmovie'
})``;
const MovieTitle = styled.h2.attrs({
  className: 'modal-addmovie-title'
})``;
const Remarks = styled.div.attrs({
  className: 'modal-addmovie-remarks'
})``;
const NotSeenIt = styled.div.attrs({
  className: 'modal-addmovie-notseenit'
})``;
const SawIt = styled.div.attrs({
  className: 'modal-addmovie-friendssawit'
})``;
const Interested = styled.div.attrs({
  className: 'modal-addmovie-friendsInterested'
})``;
const ModalControls = styled.div.attrs({
  className: 'modal-addmovie-controls'
})``;

class AddMovieModal extends Component {
  onCancel = () => {
    this.props.clearRating();
    this.props.close();
  }

  onSave = () => {
    const {
      movie,
      save,
      close,
      rating,
      remarks,
      taggedFriends,
    } = this.props;

    save(
      movie.id,
      {
        rating,
        remarks,
        taggedFriends
      }
    );

    close();
  }

  // addTaggedFriend(friend) {
  //   // TODO: check if friend is already in list n stuff
  //   this.props.updateNewRating({
  //     taggedFriends: this.props.taggedFriends.concat(friend)
  //   });
  // }
  //
  // removeTaggedFriend = (friend) => {
  //   console.log('Will remove friend');
  // }

  render() {
    const {
      movie,
      rating,
      remarks,
      friends,
      taggedFriends
    } = this.props;
    const friendsThatSaw = ((movie.friends || {}).sawIt) || [];
    const friendsInterested = ((movie.friends || {}).interested) || {};
    const savable = !!movie.id && !!rating;

    // TODO: if select movie they already saw, indicate re-rating
    // and show different options (like no "not seen it")
    return (
      <AddMovie>
        <ModalTitle>
          Rate Movie
        </ModalTitle>

        <AddMovieWithSearch
          onConfirmSelection={this.props.changeMovie}
        />

        <MovieTitle>{movie.title}</MovieTitle>
        <SawIt>
          {friendsThatSaw.map(friend => <div>{friend.username}</div>)}
        </SawIt>

        {movie.id &&
          <ForSelectedMovie>
            <NotSeenIt>
              Havent seen it?
              {friendsInterested && friendsInterested.length > 0 &&
                <Interested>
                  These friends want to watch it:
                  {friendsInterested.map(friend => (
                    friend.username
                  ))}
                </Interested>
              }

              <Button>Gauge interest</Button>
              <Button>Schedule a viewing</Button>
              <Button>See it online</Button>

            </NotSeenIt>

            <MovieRating
              movieId={movie.id}
              rating={rating}
              canEdit
            />

            <Remarks>
              What did you think?
              <TextBox
                onUpdateText={this.props.updateRemarks}
                text={this.props.remarks}
              />
            </Remarks>

          </ForSelectedMovie>
        }

        <ModalControls>
          <Button
            onClick={this.onSave}
            disabled={savable}
          >
            Save
          </Button>
          <Button onClick={this.onCancel}>
            Cancel
          </Button>
        </ModalControls>

      </AddMovie>
    );
  }
}

AddMovieModal.propTypes = {
  movie: PropTypes.object,
  rating: PropTypes.string,
  remarks: PropTypes.string,
  friends: PropTypes.object,
  taggedFriends: PropTypes.array,
  updateRating: PropTypes.func.isRequired,
  updateRemarks: PropTypes.func.isRequired,
  clearRating: PropTypes.func.isRequired,
  changeMovie: PropTypes.func.isRequired,
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
