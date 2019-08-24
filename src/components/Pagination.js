import React from 'react';

const Pagination = props => {
  const { page, setPage, tracksPerPage, setTracksPerPage } = props;

  const handleSelectOnChange = event => {
    setTracksPerPage(event.target.value);
  };

  return (
    <section className="pagination-container">
      <span>Tracks per page</span>
      <select name="select-tracks-per-page" onChange={handleSelectOnChange}>
        <option selected={tracksPerPage === 5} value={5}>
          5
        </option>
        <option selected={tracksPerPage === 10} value={10}>
          10
        </option>
        <option selected={tracksPerPage === 15} value={15}>
          15
        </option>
      </select>
    </section>
  );
};

export default Pagination;
