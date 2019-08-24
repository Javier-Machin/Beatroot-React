import React, { useEffect, useState } from 'react';
import getTracks from './api/beatroot-api';
import TrackList from './components/TrackList';

const Beatroot = () => {
  const [tracks, setTracks] = useState([]);
  const [page, setPage] = useState(1);
  const [tracksPerPage, setTracksPerPage] = useState(5);

  useEffect(() => {
    if (!tracks.length) {
      getTracks(page, tracksPerPage).then(responseTracks => {
        setTracks(responseTracks);
      });
    }
  });

  return <TrackList tracks={tracks} />;
};

export default Beatroot;
