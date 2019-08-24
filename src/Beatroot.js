import React, { useEffect, useState } from 'react';
import getTracks from './api/beatroot-api';
import TrackList from './components/TrackList';
import Pagination from './components/Pagination';

const Beatroot = () => {
  const [tracks, setTracks] = useState([]);
  const [tracksPerPage, setTracksPerPage] = useState(10);
  const [page, setPage] = useState(1);

  // Fetch tracklist on mount or changes on pagination
  useEffect(() => {
    getTracks(page, tracksPerPage).then(responseTracks => {
      setTracks(responseTracks);
    });
  }, [page, tracksPerPage]);

  return (
    <main className="main-container">
      <Pagination
        page={page}
        setPage={setPage}
        tracksPerPage={tracksPerPage}
        setTracksPerPage={setTracksPerPage}
      />
      <TrackList tracks={tracks} />
    </main>
  );
};

export default Beatroot;
