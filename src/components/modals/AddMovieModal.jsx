import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { closeModal } from '../../actions/modals.js';
import { updateNewRating, clearNewRating } from '../../actions/newRating.js';

import { Modal, ModalTitle } from './_StyledComponents.jsx';
import { Button } from '../_StyledComponents.jsx';
import MovieRating from '../movies/MovieRating/MovieRating.jsx';
import TextBox from '../TextBox.jsx';

// search
// rate
// explain

// once saved...
// see what friends have said
// and call them out if you want

const Search = styled.div``;
const MovieTitle = styled.h2``;
const Remarks = styled.div``;
const SawIt = styled.div``;
const Interested = styled.div``;

class AddMovieModal extends Component {
  onCancel() {
    this.props.clearRating();
    this.props.closeModal();
  }

  onSave() {
    const {
      saveRating,
      closeModal,
      movie,
      rating,
      remarks,
      taggedFriends,
    } = this.props;

    saveRating(
      movie.id,
      {
        rating,
        remarks,
        taggedFriends
      }
    );

    closeModal();
  }

  updateRating(rating) {
    this.props.updateNewRating({
      rating
    });
  }

  updateRemarks(remarks) {
    this.props.updateNewRating({
      remarks
    });
  }

  addTaggedFriend(friend) {
    const { updateNewRating, taggedFriends } = this.props;

    // TODO: check if friend is already in list
    this.props.updateNewRating({
      taggedFriends: taggedFriends.concat(friend)
    });
  }

  removeTaggedFriend(friend) {
    console.log('Will remove friend');
  }

  render() {
    const {
      movie,
      rating,
      remarks,
      friends,
      taggedFriends,
    } = this.props;
    const friendsThatSaw = ((movie.friends || {}).sawIt) || [];
    const friendsInterested = ((movie.friends || {}).interested) || {};

    return (
      <Modal>
        <ModalTitle>
          Rate Movie
        </ModalTitle>
        <Search />

        <MovieTitle>{movie.title}</MovieTitle>
        <SawIt>
          {friendsThatSaw.map(friend => <div>{friend.username}</div>)}
        </SawIt>

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

        {movie.id &&
          <MovieRating
            movieId={movieId}
            rating={rating}
            canEdit
          />
        }
        <Remarks>
          What did you think?
          <TextBox
            onUpdateText={this.updateRemarks}
            text={this.remarks}
          />
        </Remarks>
        <Button onClick={this.onSave}>
          Save
        </Button>
        <Button onClick={this.onCancel}>
          Cancel
        </Button>
      </Modal>
    );
  }
}

AddMovieModal.propTypes = {
  movie: PropTypes.object,
  rating: PropTypes.string,
  remarks: PropTypes.string,
  friends: PropTypes.object,
  taggedFriends: PropTypes.array
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
    taggedFriends: state.newRating.taggedFriends,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateNewRating: data => updateNewRating(data),
    clearRating: clearNewRating,
    saveRating: (movieId, { rating, remarks, taggedFriends }) => (
      updateMovieRating(movieId, { rating, remarks, taggedFriends })
    ),
    closeModal
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMovieModal);
