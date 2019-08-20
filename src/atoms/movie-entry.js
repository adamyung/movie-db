import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ImageConfigContext } from "../utils/context";

import './movie-entry.scss';

function MovieEntry(props) {
  const { data = {} } = props;
  const {
    id = '',
    title = '',
    release_date: releaseDate = '2000-1-1',
    poster_path: posterPath = '',
  } = data;

  return (
    <ImageConfigContext.Consumer>
      {
        ({secure_base_url: secureBaseUrl = '', poster_sizes: posterSizes = []}) => (
          <Link
            className="movie-entry"
            to={`/movie/${id}`}
          >
            <div className="movie-entry__poster-wrapper">
              {
                Boolean(posterPath) &&
                <img
                  className="movie-entry__poster"
                  src={`${secureBaseUrl}${posterSizes[0] || ''}${posterPath}`}
                  alt={title}
                />
              }
            </div>
            <p className="movie-entry__title">{title}</p>
            <p className="movie-entry__release">{releaseDate.substring(0, 4)}</p>
          </Link>
        )
      }
    </ImageConfigContext.Consumer>
  );
}

MovieEntry.propTypes = {
  data: PropTypes.object,
};

export default MovieEntry;