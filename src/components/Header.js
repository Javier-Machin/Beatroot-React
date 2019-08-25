import React from 'react';
import PropTypes from 'prop-types';
import './css/header.css';

const Header = props => {
  const {
    page,
    setPage,
    tracksPerPage,
    setTracksPerPage,
    paginationData,
    loading
  } = props;

  const { prev_page: prevPage, next_page: nextPage } = paginationData;

  // String to prevent passing a boolean to className (React will complain otherwise)

  const backButtonClass = String(!prevPage && 'disabled');
  const forwardButtonClass = String(!nextPage && 'disabled');

  const handleSelectOnChange = ({ target }) => {
    setTracksPerPage(target.value);
  };

  const handleArrowOnClick = ({ target }) => {
    if (loading) return;
    if (target.name.includes('back')) setPage(page - 1);
    if (target.name.includes('forward')) setPage(page + 1);
  };

  return (
    <header className="header-container">
      <div className="logo-container">
        <span className="logo logo-main">Beatroot</span>
        <span className="logo logo-secondary">Lite</span>
      </div>
      <div className="arrows-container">
        <button
          disabled={!prevPage}
          name="back"
          type="button"
          data-testid="back-button"
          className={backButtonClass}
          onClick={handleArrowOnClick}
        >
          <ion-icon
            name="arrow-back"
          />
        </button>
        <span className="header-page-number">{page}</span>
        <button
          disabled={!nextPage}
          name="forward"
          type="button"
          data-testid="forward-button"
          className={forwardButtonClass}
          onClick={handleArrowOnClick}
        >
          <ion-icon name="arrow-forward" />
        </button>
      </div>
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
    </header>
  );
};

Header.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  paginationData: PropTypes.object.isRequired,
  setTracksPerPage: PropTypes.func.isRequired,
  tracksPerPage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

export default Header;
