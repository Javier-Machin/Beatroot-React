import React, { useEffect, useState } from 'react';
import getTracks from './api/beatroot-api';
import TrackList from './components/TrackList';
import Header from './components/Header';
import './components/css/beatroot.css';

const Beatroot = () => {
  const [paginationData, setPaginationData] = useState({});
  const [tracksPerPage, setTracksPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [page, setPage] = useState(1);

  /**
   * Fetch tracks on mount and pagination changes
   * The returned function is called on unmount, stops any non-resolved request
   */

  useEffect(() => {
    setLoading(true);
    let stopRequest = false;
    getTracks(page, tracksPerPage).then(response => {
      if (!stopRequest) {
        setTracks(response.tracks);
        setPaginationData(response.paginationData);
        setLoading(false);
      }
    });
    return () => {
      stopRequest = true;
    };
  }, [page, tracksPerPage]);

  return (
    <main className="main-container">
      <Header
        page={page}
        setPage={setPage}
        tracksPerPage={tracksPerPage}
        setTracksPerPage={setTracksPerPage}
        paginationData={paginationData}
        loading={loading}
      />
      <TrackList
        tracks={tracks}
        loading={loading}
      />
    </main>
  );
};

export default Beatroot;
