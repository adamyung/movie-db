import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { ImageConfigContext } from "../utils/context";

import './movie-card.scss';

function MovieCard(props) {
  const { data = {} } = props;
  const {
    id = '',
    title = '',
    vote_average: voteAverage = 0,
    release_date: releaseDate = '2000-1-1',
    poster_path: posterPath = '',
  } = data;

  return (
    <ImageConfigContext.Consumer>
      {
        ({secure_base_url: secureBaseUrl = '', poster_sizes: posterSizes = []}) => (
          <div className="movie-card">
            <Link
              className="movie-card__link"
              to={`/movie/${id}`}
            >
              {
                Boolean(posterPath) &&
                <img
                  className="movie-card__poster"
                  src={`${secureBaseUrl}${posterSizes[3] || ''}${posterPath}`}
                  alt={title}
                />
              }
            </Link>
            <span className="movie-card__rating">{voteAverage.toFixed(1)}</span>
            <h5 className="movie-card__title">{title}</h5>
            <h6 className="movie-card__release">{Moment(releaseDate).format('MMMM YYYY')}</h6>
          </div>
        )
      }
    </ImageConfigContext.Consumer>
  );
}

MovieCard.propTypes = {
  data: PropTypes.object,
};

export default MovieCard;