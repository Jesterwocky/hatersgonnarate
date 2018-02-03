import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import styled from 'styled-components';

import { ADD_MOVIE_MODAL, buttonMinHeight, buttonColor, themes } from '../../util/constants.js';

import { findMatchingMovies } from '../../actions/movies.js';
import { openModal } from '../../actions/modals/modals.js';

import Search from '../Search/Search.jsx';

// import { Button } from '../_StyledComponents.jsx';
// import TextBox from '../TextBox.jsx';
// import SearchSuggestions from '../SearchSuggestions.jsx';
//
// const Search = styled.div.attrs({
//   className: 'movie-search'
// })`
//   width: 100%;
//   display: flex;
// `;
//
// const AddButton = Button.extend`
//   white-space: nowrap;
// `;
//
// const SearchContainer = styled.div.attrs({
//   className: 'add-movie-with-search-container'
// })`
//   position: relative;
//   margin-left: 10px;
//   flex: 1;
// `;
//
// const Options = styled.div.attrs({
//   className: 'movie-search-options'
// })`
//   position: absolute;
//   top: ${buttonMinHeight};
//   width: 100%;
//   box-sizing: border-box;
//   border-bottom-right-radius: 2px;
//   border-bottom-left-radius: 2px;
//   padding: 5px;
//
//   background-color: ${buttonColor};
//   color: white;
//   font-size: 14px;
// `;
//
// const Option = styled.div.attrs({
//   className: 'movie-search-options-option'
// })`
//   white-space: nowrap;
//   padding: 7px 0;
//   overflow: hidden;
// `;
//
// const SearchText = styled(TextBox).attrs({
//   className: 'movie-search-searchtext',
//   height: buttonMinHeight
// })``;

const MovieSearch = ({
  matches,
  findMovies,
  onMovieFound,
  openAddMovieModal,
  confirmOnSelect,
  theme,
  children
}) => (
  <Search
    matches={matches}
    findMatches={findMovies}
    onConfirmFound={onMovieFound || openAddMovieModal}
    confirmOnSelect={confirmOnSelect}
    theme={theme}
    placeholder="Search for a movie"
  >
    {children}
  </Search>
);


// // TODO: listen for enter and interpret as Search click when component's focused
// class MovieSearch extends Component {
//   state = {
//     searchString: '',
//     selectedMovie: {},
//     showSuggestions: false
//   }
//
//   onUpdateText = (text) => {
//     // TODO: select movie if movie title in suggestions exactly matches text
//     this.props.findMatchingMovies(text);
//
//     this.setState({
//       selectedMovie: {},
//       searchString: text,
//       showSuggestions: !(text === '')
//     });
//   }
//
//   onGo = () => {
//     const { onConfirmSelection, openAddMovieModal } = this.props;
//
//     // By default, passes movie to modal and opens modal.
//     // But will call custom function if provided (e.g., inside
//     // modal, don't need to open modal).
//     if (typeof onConfirmSelection === 'function') {
//       onConfirmSelection(this.state.selectedMovie);
//     } else {
//       openAddMovieModal(this.state.selectedMovie);
//       this.setState({
//         searchString: '',
//         selectedMovie: {},
//         showSuggestions: false
//       });
//     }
//   }
//
//   onSelectSuggestedMovie = (selectedMovie) => {
//     if (typeof this.props.onFindMovie === 'function') {
//       this.props.onFindMovie(selectedMovie);
//     }
//
//     this.setState({
//       selectedMovie,
//       searchString: selectedMovie.title,
//       showSuggestions: false
//     });
//   }
//
//   render() {
//     const { searchString, showSuggestions } = this.state;
//     return (
//       <Search>
//         {this.props.includeButton &&
//           <AddButton onClick={this.onGo}>
//             + Movie
//           </AddButton>
//         }
//
//         <SearchContainer>
//           {showSuggestions && this.props.matches.length > 0 &&
//             <SearchSuggestions
//               suggestions={this.props.matches.map(movie => (
//                 { ...movie, text: movie.title }
//               ))}
//               onSelectSuggestion={this.onSelectSuggestedMovie}
//             />
//           }
//
//           <SearchText
//             text={searchString}
//             onUpdateText={this.onUpdateText}
//             theme={this.props.theme}
//           />
//         </SearchContainer>
//       </Search>
//     );
//   }
// }

MovieSearch.propTypes = {
  openAddMovieModal: PropTypes.func.isRequired,
  matches: PropTypes.array,
  findMovies: PropTypes.func,
  onMovieFound: PropTypes.func,
  theme: PropTypes.string,
  children: PropTypes.node
};

MovieSearch.defaultProps = {
  matches: [],
  findMovies: null,
  onMovieFound: null,
  theme: '',
  children: null
};

function mapStateToProps(state) {
  return {
    matches: state.movies.searchMatches
  };
}

function mapDispatchToProps(dispatch) {
  return {
    findMovies: text => findMatchingMovies(dispatch, text),
    openAddMovieModal: movie => openModal(
      dispatch,
      ADD_MOVIE_MODAL,
      { movie }
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieSearch);
