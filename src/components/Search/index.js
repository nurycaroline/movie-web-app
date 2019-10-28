import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Search = ({ onChangeSearchBy, value }) => (
  <div className="search">
    <input
      type="text"
      placeholder="pesquise filmes por titulo aqui"
      value={value}
      onChange={e => onChangeSearchBy(e.currentTarget.value)}
    />
  </div>
);

Search.propTypes = {
  onChangeSearchBy: PropTypes.func,
  value: PropTypes.string,
};

Search.defaultProps = {
  onChangeSearchBy: () => {},
  value: '',
};

export default Search;
