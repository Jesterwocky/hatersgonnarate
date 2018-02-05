import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link } from './_StyledComponents.jsx';
import { footerHeight, pagePadding } from '../util/constants.js';
import { DARK } from '../util/themes.js';

const StyledNavBar = styled.div`
  width: 100%;
  height: ${footerHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: ${DARK.header.background};
  padding: 0 ${pagePadding};
  box-sizing: border-box; // don't count padding in width
`;

export const NavBarLink = Link.extend`
  font-size: 10px;
`;

const NavBar = ({ isLoggedIn = false }) => (
  <StyledNavBar>
    <NavBarLink href="https://www.google.com">
      Search Teh Googs
    </NavBarLink>

    <NavBarLink href="https://www.nytimes.com/">
      Read teh nooz
    </NavBarLink>

    {isLoggedIn &&
      <NavBarLink href="https://www.nytimes.com/">
        More stuff
      </NavBarLink>
    }

  </StyledNavBar>
);

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool,
};

NavBar.defaultProps = {
  isLoggedIn: false,
};

export default NavBar;
