import React from 'react';
import PropTypes from 'prop-types';

const Pagination = props => {
  const { page, setPage, tracksPerPage, setTracksPerPage } = props;

  const handleSelectOnChange = event => {
    setTracksPerPage(event.target.value);
  };

  return (
    <section className="pagination-container">
      <div className="select-container">
        <span>Tracks per page</span>
        <select
          data-testid="pagination-select"
          name="select-tracks-per-page"
          value={tracksPerPage}
          onChange={handleSelectOnChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}> 15 </option>
        </select>
      </div>
    </section>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  tracksPerPage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  setTracksPerPage: PropTypes.func.isRequired
};

export default Pagination;
