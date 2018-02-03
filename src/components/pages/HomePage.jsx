import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getMovies, getMovie, updateMovieRating } from '../../actions/movies.js';
import MoviesList from '../movies/MoviesList/MoviesList.jsx';
import MovieSearch from '../movies/MovieSearch.jsx';

import {
  Page,
  // Heading,
  SubHeading,
  Content,
  Column
} from './_StyledComponents.jsx';

const Home = Page.extend.attrs({
  className: 'page-home'
})``;

const HomeContent = Content.extend.attrs({
  className: 'page-home-content'
})``;

const MainContent = Column.extend.attrs({
  className: 'page-home-main'
})``;

const MoviesSidebar = Column.extend.attrs({
  sidebar: 'true',
  className: 'page-home-sidebar'
})``;

const HomeSubHeading = SubHeading.extend.attrs({
  className: 'page-home-subheading'
})`
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

class HomePage extends Component {
  componentWillMount() {
    this.props.getMovies();
  }

  createOnClickMovie = id => (
    () => this.props.getMovie(id)
  );

  // TODO: sort movies here?
  orderMovies = () => {
    const { movies } = this.props.movies;

    if (!movies) return [];

    return Object.keys(movies).map(id => (
      movies[id]
    ));
  }

  render() {
    const movieList = this.orderMovies();

    return (
      <Home>
        <HomeContent>
          <MoviesSidebar>
            <MoviesList
              movies={movieList}
              getMovies={this.props.getMovies}
              getMovie={this.createOnClickMovie}
            />

          </MoviesSidebar>

          <MainContent>
            <MovieSearch>
              + movie
            </MovieSearch>
          </MainContent>

        </HomeContent>

      </Home>
    );
  }
}

HomePage.propTypes = {
  movies: PropTypes.object,
  getMovies: PropTypes.func.isRequired,
  getMovie: PropTypes.func.isRequired,
  updateMovieRating: PropTypes.func.isRequired
};

HomePage.defaultProps = {
  movies: []
};

function mapStateToProps(state) {
  return { movies: state.movies };
}

function mapDispatchToProps(dispatch) {
  return {
    getMovies: () => getMovies(dispatch),
    getMovie: id => getMovie(dispatch, id),
    updateMovieRating: (id, rating) => updateMovieRating(dispatch, id, rating),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
