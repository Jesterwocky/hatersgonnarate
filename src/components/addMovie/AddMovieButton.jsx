import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { openModal, closeModal } from '../../actions/modals.js';
import { ADD_MOVIE_MODAL } from '../../util/constants.js';
import { Button } from '../_StyledComponents.jsx';

const AddButton = Button.extend`
  white-space: nowrap;
  background-color: #008eef;
  color: white;
`;

const AddMovieButton = ({
  movieToAdd,
  openAddMovieModal,
  children
}) => {
  function onClick() {
    openAddMovieModal(movieToAdd);
  }

  return (
    <AddButton onClick={onClick}>
      {children || 'Add Movie'}
    </AddButton>
  );
};

AddMovieButton.propTypes = {
  movieToAdd: PropTypes.object,
  children: PropTypes.node,
  openAddMovieModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

AddMovieButton.defaultProps = {
  movieToAdd: {},
  children: null,
};

function mapDispatchToProps(dispatch) {
  return {
    openAddMovieModal: movie => openModal(
      dispatch,
      ADD_MOVIE_MODAL,
      { movie }
    ),
    closeModal
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AddMovieButton);
