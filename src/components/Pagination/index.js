import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Pagination = ({
  pageActual,
  onClickBackPage,
  onClickNextPage,
  totalPages,
}) => (
  <div className="pagination">
    <button
      disabled={pageActual === 1}
      type="button"
      onClick={onClickBackPage}
    >
      Anterior
    </button>
    <p>
      {pageActual} de {totalPages}
    </p>
    <button type="button" onClick={onClickNextPage}>
      Proximo
    </button>
  </div>
);

Pagination.propTypes = {
  pageActual: PropTypes.number,
  onClickBackPage: PropTypes.func,
  onClickNextPage: PropTypes.func,
  totalPages: PropTypes.number,
};

Pagination.defaultProps = {
  pageActual: 1,
  onClickBackPage: () => {},
  onClickNextPage: () => {},
  totalPages: 0,
};

export default Pagination;
