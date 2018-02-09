import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '../../Dialog';

const PreviousRatingDialog = ({ onClose, continueFromPreviousRating }) => {
  const actions = [
    {
      label: 'start over',
      onClick: onClose,
    },
    {
      label: 'pick up where I left off',
      onClick: continueFromPreviousRating,
    },
  ];

  return (
    <Dialog actions={actions}>
      You started rating this movie before.
    </Dialog>
  );
};

PreviousRatingDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  continueFromPreviousRating: PropTypes.func.isRequired,
};

export default PreviousRatingDialog;
