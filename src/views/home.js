import React from 'react';
import { throttle } from 'lodash';
import { fetchPopularMovies } from "../utils/api";
import MovieList from '../molecules/movie-list';
import MovieSearch from "../molecules/movie-search";
import Loader from "../atoms/loader";

import './home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      movies: [],
      loading: false,
    };
    this.onPageScroll = this.onPageScroll.bind(this);
    this.throttledScroll = throttle(this.onPageScroll, 1000);
  }

  fetchMovies(page) {
    this.setState({loading: true});

    fetchPopularMovies(page).then((response) => {
      const { page = 0, results = [] } = response;

      this.setState((state) => ({
        page: page,
        movies: state.movies.concat(results),
        loading: false
      }));
    });
  }

  onPageScroll() {
    if (this.state.loading) return;

    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      this.fetchMovies(this.state.page + 1);
    }
  }

  componentDidMount() {
    this.fetchMovies(this.state.page);
    window.addEventListener('scroll', this.throttledScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledScroll, false);
  }

  render() {
    return (
      <main className="home-container">
        <div className="home-container__logo">The Movie DB</div>

        <MovieSearch />

        <h3 className="home-container__title">Popular Movies</h3>

        <MovieList movies={this.state.movies} />

        <div className={`home-container__loader-wrapper ${this.state.loading ? 'show' : ''}`}>
          <Loader/>
        </div>
      </main>
    );
  };
}

export default Home;