import React, { useEffect, useState } from 'react';
import getTracks from './api/beatroot-api';
import TrackList from './components/TrackList';
import Header from './components/Header';
import './components/css/beatroot.css';

const Beatroot = () => {
  const [tracks, setTracks] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [loading, setLoading] = useState(false);
  const [tracksPerPage, setTracksPerPage] = useState(10);
  const [page, setPage] = useState(1);

  // Fetch tracklist on mount or pagination changes
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
    // called on unmount to prevent the request
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
      />
      <TrackList tracks={tracks} loading={loading} />
    </main>
  );
};

export default Beatroot;
