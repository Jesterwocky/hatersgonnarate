import React from 'react';
import PropTypes from 'prop-types';

import MessagesContainerWithOverleaves from '../../../conversations/MessagesContainerWithOverleaves';
import SeedConvoOverleaf from './SeedConvoOverleaf';

const SeedConvoContainer = ({
  initiator,
  targetUser,
  movie,
  children,
}) => (
  <MessagesContainerWithOverleaves
    leftOverleaf={
      <SeedConvoOverleaf
        {...initiator}
        movie={movie}
      />
    }
    rightOverleaf={
      <SeedConvoOverleaf
        {...targetUser}
        movie={movie}
      />
    }
  >
    {children}
  </MessagesContainerWithOverleaves>
);

SeedConvoContainer.propTypes = {
  initiator: PropTypes.object.isRequired,
  targetUser: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  children: PropTypes.node,
};

SeedConvoContainer.defaultProps = {
  children: null,
};

export default SeedConvoContainer;
