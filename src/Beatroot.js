import React, { useEffect, useState } from 'react';
import { getTracks } from './api/beatroot-api';
import Header from './components/Header';
import TrackList from './components/TrackList';
import TrackForm from './components/TrackForm';
import AudioPlayer from './components/AudioPlayer';
import ModalWindow from './components/ModalWindow';
import './components/css/beatroot.css';

const Beatroot = () => {
  const [paginationData, setPaginationData] = useState({});
  const [tracksPerPage, setTracksPerPage] = useState(10);
  const [selectedTrackToPlay, setSelectedTrackToPlay] = useState({});
  const [shouldPlay, setShouldPlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [page, setPage] = useState(1);


  const updateTrackList = (response) => {
    setTracks(response.tracks);
    setPaginationData(response.paginationData);
    setLoading(false);
  };

  /**
   * Fetch tracks on mount and pagination changes
   * The returned function is called on unmount, stops any non-resolved request
   */

  useEffect(() => {
    let stopRequest = false;
    setLoading(true);
    getTracks(page, tracksPerPage).then((response) => {
      if (!stopRequest) updateTrackList(response);
    });
    return () => {
      stopRequest = true;
    };
  }, [page, tracksPerPage]);

  return (
    <div className="app-container">
      <Header
        page={page}
        setPage={setPage}
        tracksPerPage={tracksPerPage}
        setTracksPerPage={setTracksPerPage}
        paginationData={paginationData}
        loading={loading}
      />
      <main className="main-content">
        <ModalWindow
          withOpenButton
          openButtonText="Add New Track"
        >
          <TrackForm
            updateTrackList={updateTrackList}
            page={page}
            tracksPerPage={tracksPerPage}
            setLoading={setLoading}
          />
        </ModalWindow>
        <TrackList
          tracks={tracks}
          updateTrackList={updateTrackList}
          tracksPerPage={tracksPerPage}
          page={page}
          setShouldPlay={setShouldPlay}
          setSelectedTrackToPlay={setSelectedTrackToPlay}
          loading={loading}
          setLoading={setLoading}
        />
        <AudioPlayer
          track={selectedTrackToPlay}
          setShouldPlay={setShouldPlay}
          shouldPlay={shouldPlay}
        />
      </main>
    </div>
  );
};

export default Beatroot;
