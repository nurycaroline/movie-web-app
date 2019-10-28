import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Movie = ({
  title, image, overview, genres,
}) => (
  <div className="movie">
    {image && (
      <img src={`https://image.tmdb.org/t/p/w200${image}`} alt="" />
    )}
    <div className="information">
      <p className="title">{title}</p>
      <p className="overview">{overview}</p>
      <p className="genres">{genres}</p>
    </div>
  </div>
);

Movie.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  overview: PropTypes.string,
  genres: PropTypes.string,
};

Movie.defaultProps = {
  title: '',
  image: '',
  overview: '',
  genres: '',
};

export default Movie;
