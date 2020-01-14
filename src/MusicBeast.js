import React, { useEffect, useState } from 'react';
import { getTracks } from './api/music-beast-api';
import Header from './components/Header';
import TrackList from './components/TrackList';
import TrackForm from './components/TrackForm';
import AudioPlayer from './components/AudioPlayer';
import ModalWindow from './components/ModalWindow';
import AuthForm from './components/AuthForm';
import UserInfo from './components/UserInfo';
import './components/css/music-beast.css';

const MusicBeast = () => {
  const [paginationData, setPaginationData] = useState({});
  const [tracksPerPage, setTracksPerPage] = useState(10);
  const [selectedTrackToPlay, setSelectedTrackToPlay] = useState({});
  const [shouldPlay, setShouldPlay] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState('');
  const [page, setPage] = useState(1);

  const updateTrackList = response => {
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
    if (loggedIn) {
      setLoading(true);
      getTracks(page, tracksPerPage, setLoggedIn).then(response => {
        if (!stopRequest) updateTrackList(response);
      });
    }
    return () => {
      stopRequest = true;
    };
  }, [page, tracksPerPage, loggedIn]);

  if (!loggedIn) return <AuthForm setLoggedIn={setLoggedIn} />;

  return tracks ? (
    <div className="app-container" data-testid="app-container">
      <Header
        page={page}
        setPage={setPage}
        tracksPerPage={tracksPerPage}
        setTracksPerPage={setTracksPerPage}
        paginationData={paginationData}
        loading={loading}
      />
      <UserInfo setLoggedIn={setLoggedIn} />
      <main className="main-content">
        <ModalWindow withOpenButton openButtonText="Add New Track">
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
          setLoggedIn={setLoggedIn}
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
  ) : null;
};

export default MusicBeast;
