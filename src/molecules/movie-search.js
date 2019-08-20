import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { searchMovie } from "../utils/api";
import DebouncedInput from "../atoms/debounced-input";
import MovieEntry from "../atoms/movie-entry";

import './movie-search.scss';

class MovieSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      searchKeyword: '',
      searchResults: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(value) {
    this.setState({
      searchKeyword: value,
    });

    if (this.state.fetching || value === '') {
      this.setState({
        searchResults: [],
      });
      return;
    }

    this.setState({fetching: true});

    searchMovie(value).then((response) => {
      const {results = []} = response;
      this.setState({
        fetching: false,
        searchResults: results,
      });
    })
  }

  render() {
    const movieEntries = this.state.searchResults.map((movie) =>
      <li
        key={`movie-search-result_${movie.id}`}
        className="movie-search__item"
      >
        <MovieEntry data={movie} />
      </li>
    );

    return (
      <div className="movie-search">
        <div className="movie-search__input-wrapper">
          <DebouncedInput onInputChange={this.handleInputChange} disabled={this.state.fetching} />
          <FontAwesomeIcon icon="search" className="movie-search__search-icon" />
        </div>
        {
          (this.state.searchKeyword !== '' && !this.state.fetching) &&
          <ul className="movie-search__results">{
            this.state.searchResults.length ? movieEntries :
              <h6 className="movie-search__results-none">No results found</h6>
          }</ul>
        }
      </div>
    )
  }
}

export default MovieSearch;