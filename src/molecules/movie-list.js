import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../atoms/movie-card';

import './movie-list.scss';

function MovieList(props) {
  const listItems = props.movies.map((movie) =>
    <li
      key={movie.id}
      className="movie-list__item"
    >
      <MovieCard data={movie} />
    </li>
  );

  return (<ul className="movie-list">{listItems}</ul>);
}

MovieList.propTypes = {
  movies: PropTypes.array,
};

export default MovieList;