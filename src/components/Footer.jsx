import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link } from './_StyledComponents';
import { footerHeight, pagePadding } from '../util/constants';
import { DARK } from '../util/themes';

const StyledFooter = styled.div`
  width: 100%;
  height: ${footerHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  color: white;
  background-color: ${DARK.footer.background};
  padding: 0 ${pagePadding};
  box-sizing: border-box; // don't count padding in width
`;

export const FooterLink = Link.extend`
  font-size: 10px;
`;

const Footer = ({ isLoggedIn = false }) => (
  <StyledFooter>
    <FooterLink href="https://www.google.com">
      Search Teh Googs
    </FooterLink>

    <FooterLink href="https://www.nytimes.com/">
      Read teh nooz
    </FooterLink>

    {isLoggedIn &&
      <FooterLink href="https://www.nytimes.com/">
        More stuff
      </FooterLink>
    }

  </StyledFooter>
);

Footer.propTypes = {
  isLoggedIn: PropTypes.bool,
};

Footer.defaultProps = {
  isLoggedIn: false,
};

export default Footer;
