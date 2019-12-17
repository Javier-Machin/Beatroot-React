import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getTracks, deleteTrack, getTrack } from '../api/music-beast-api';
import ModalWindow from './ModalWindow';
import TrackForm from './TrackForm';
import Lyrics from './Lyrics';
import trackImage from '../assets/track.png';
import deleteIcon from '../assets/delete.png';
import editIcon from '../assets/edit.png';
import lyricsIcon from '../assets/lyrics.png';
import play from '../assets/play.png';
import './css/tracklist.css';

const TrackList = props => {
  const [selectedTrack, setSelectedTrack] = useState({
    lyrics: '',
    artist: { name: '' },
  });
  const [editTrackModalOpen, setEditTrackModalOpen] = useState(false);
  const [lyricsModalOpen, setLyricsModalOpen] = useState(false);

  const {
    tracks = [],
    loading,
    setLoading,
    setSelectedTrackToPlay,
    setShouldPlay,
    updateTrackList,
    tracksPerPage,
    page,
  } = props;

  const handleTrackPlay = async event => {
    const clickedTrackId = Number(event.target.name);
    setLoading(true);
    const trackWithAllData = await getTrack(clickedTrackId);
    setLoading(false);
    if (trackWithAllData.file) {
      setSelectedTrackToPlay(trackWithAllData);
      setShouldPlay(true);
    }
  };

  const handleDeleteTrack = async event => {
    setLoading(true);
    const clickedTrackId = event.target.name;
    const response = await deleteTrack(clickedTrackId);
    if (response.status === 204) {
      const updatedTrackList = await getTracks(page, tracksPerPage);
      updateTrackList(updatedTrackList);
    }
  };

  const handleEditTrack = async event => {
    setLoading(true);
    const clickedTrackId = event.target.name;
    const trackWithAllData = await getTrack(clickedTrackId);
    await setSelectedTrack(trackWithAllData);
    setEditTrackModalOpen(true);
    setLoading(false);
  };

  const handleLyricsClick = async event => {
    setLoading(true);
    const clickedTrackId = event.target.name;
    const trackWithAllData = await getTrack(clickedTrackId, 'lyrics');
    setSelectedTrack(trackWithAllData);
    setLyricsModalOpen(true);
    setLoading(false);
  };

  return (
    <>
      <section className="tracklist-container">
        {loading && <p className="loading">Loading</p>}
        {tracks.map((track, index) => {
          const { id, title, artist } = track;

          const testId = `track-${index + 1}`;
          const uniqueKey = Date.now() + Math.random() + index;

          return (
            <div
              className="track-container"
              data-testid={testId}
              key={uniqueKey}
            >
              <button
                className="track-image-button"
                type="button"
                onClick={handleTrackPlay}
              >
                <img
                  name={id}
                  className="track-image"
                  alt="track cover art"
                  src={trackImage}
                />
                <img
                  name={id}
                  data-testid={`track-play-${index + 1}`}
                  className="track-play-img"
                  alt="track play button"
                  src={play}
                />
              </button>
              <div className="track-title-container">
                <p className="track-title">{title}</p>
                <p className="track-artist">{artist.name}</p>
              </div>
              <div className="track-icons-container">
                <button name={id} type="button" onClick={handleDeleteTrack}>
                  <img
                    name={id}
                    className="icon icon-delete"
                    alt="icon to delete"
                    src={deleteIcon}
                  />
                </button>
                <button name={id} type="button" onClick={handleEditTrack}>
                  <img
                    name={id}
                    className="icon icon-edit"
                    alt="icon to edit"
                    src={editIcon}
                  />
                </button>
                <button name={id} type="button" onClick={handleLyricsClick}>
                  <img
                    name={id}
                    className="icon icon-lyrics"
                    alt="icon to lyrics"
                    src={lyricsIcon}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </section>
      <div>
        {lyricsModalOpen && !editTrackModalOpen && (
          <ModalWindow isOpen={lyricsModalOpen} setIsOpen={setLyricsModalOpen}>
            <Lyrics
              selectedLyrics={selectedTrack.lyrics}
              title={selectedTrack.title}
              artist={selectedTrack.artist.name}
            />
          </ModalWindow>
        )}
        {editTrackModalOpen && !lyricsModalOpen && (
          <ModalWindow
            isOpen={editTrackModalOpen}
            setIsOpen={setEditTrackModalOpen}
          >
            <TrackForm
              track={selectedTrack}
              updateTrackList={updateTrackList}
              setEditTrackModalOpen={setEditTrackModalOpen}
              page={page}
              tracksPerPage={tracksPerPage}
              setLoading={setLoading}
            />
          </ModalWindow>
        )}
      </div>
    </>
  );
};

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setSelectedTrackToPlay: PropTypes.func.isRequired,
  setShouldPlay: PropTypes.func.isRequired,
  updateTrackList: PropTypes.func.isRequired,
  tracksPerPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  page: PropTypes.number.isRequired,
};

export default TrackList;
