import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchMovie } from "../utils/api";
import { formattedRuntime } from "../utils/format";
import { ImageConfigContext } from "../utils/context";

import './movie.scss';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    fetchMovie(this.props.match.params.id).then((response) => {
      this.setState({
        data: response,
      });
    });
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const {
      title = '',
      overview = '',
      runtime = 0,
      release_date: releaseDate = '2000-1-1',
      poster_path: posterPath = '',
      backdrop_path: backdropPath = '',
      vote_average: voteAverage = 0,
    } = this.state.data;

    const {
      secure_base_url: secureBaseUrl = '',
      poster_sizes: posterSizes = [],
      backdrop_sizes: backdropSizes = [],
    } = this.context;

    const selectedPosterSize = window.innerWidth < 768 ? backdropSizes[1] : backdropSizes[2];

    const containerStyle = {
      backgroundImage: backdropPath ? `url(${secureBaseUrl}${selectedPosterSize}${backdropPath})` : '',
    };

    return (
      <div
        className="movie-container"
        style={containerStyle}
      >
        <button
          className="movie-container__go-back"
          onClick={this.goBack}
        >
          <FontAwesomeIcon icon="arrow-left" />
        </button>

        <div className="movie-container__content">
          <section className="movie-container__details">
            {
              Boolean(posterPath) &&
              <img
                className="movie-container__poster"
                src={`${secureBaseUrl}${posterSizes[3] || ''}${posterPath}`}
                alt={title}
              />
            }
            <h3 className="movie-container__title">{title}</h3>
            <p className="movie-container__rating">{releaseDate.substring(0, 4)} &#xB7; {voteAverage.toFixed(1)} User Score</p>
            <p className="movie-container__length">{formattedRuntime(runtime)}</p>
          </section>

          <hr className="movie-container__divider" />

          <h4 className="movie-container__overview-title">Overview</h4>
          <p className="movie-container__overview">{overview}</p>
        </div>
      </div>
    );
  }
}

Movie.contextType = ImageConfigContext;

export default Movie;