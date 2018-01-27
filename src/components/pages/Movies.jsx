import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getMovies, getMovie, updateMovieRating } from '../../actions/movies.js';

import MoviesList from '../movies/MoviesList/MoviesList.jsx';

import {
  Page,
  Heading,
  SubHeading,
  Content,
  Column
} from './_StyledComponents.jsx';

const Movies = Page.extend`
`;

const MoviesSubHeading = SubHeading.extend`
  font-size: 20px;
`;

class MoviesPage extends Component {
  componentWillMount() {
    this.props.getMovies();
  }

  createOnClickMovie = id => (
    () => this.props.getMovie(id)
  );

  // TODO: sort movies here
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
      <Movies className="page-movies">
        <Heading className="page-movies-heading">
          Movies
        </Heading>

        <Content className="page-movies-content">
          <Column sidebar className="page-movies-sidebar">
            <MoviesSubHeading className="page-movies-sidebar-subheading">
              Latest Movies
            </MoviesSubHeading>
            <MoviesList
              movies={movieList}
              getMovies={this.props.getMovies}
              getMovie={this.createOnClickMovie}
            />
          </Column>

          <Column className="page-movies-main">
            Latest Movie Junk
          </Column>
        </Content>
      </Movies>
    );
  }
}

MoviesPage.propTypes = {
  movies: PropTypes.object,
  getMovies: PropTypes.func.isRequired,
  getMovie: PropTypes.func.isRequired,
  updateMovieRating: PropTypes.func.isRequired
};

MoviesPage.defaultProps = {
  movies: []
};

function mapStateToProps(state) {
  return { movies: state.movies };
}

function mapDispatchToProps(dispatch) {
  return {
    getMovies: () => getMovies(dispatch),
    getMovie: id => getMovie(dispatch, id),
    updateMovieRating: (id, rating) => updateMovieRating(dispatch, id, rating)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesPage);
