import React from 'react';

import {
  Page,
  Heading,
  Content,
  Column
} from './StyledComponents.jsx';

import LoggedInFooter from './PageComponents/LoggedInFooter.jsx';

const Movies = Page.extend`
  background-color: yellow;
`;

const MoviesPage = () => (
  <Movies>
    <Heading>
      Movies
    </Heading>

    <Content>
      <Column sidebar>
        Sidey
      </Column>

      <Column>
        Big section
      </Column>
    </Content>

    <LoggedInFooter />
  </Movies>
);

export default MoviesPage;
