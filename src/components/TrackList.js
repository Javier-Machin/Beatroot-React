import React from 'react';
import PropTypes from 'prop-types';
import getTracks, { deleteTrack } from '../api/beatroot-api';
import trackImage from '../assets/track.png';
import deleteIcon from '../assets/delete.png';
import editIcon from '../assets/edit.png';
import lyricsIcon from '../assets/lyrics.png';
import play from '../assets/play.png';
import './css/tracklist.css';

const TrackList = props => {
  const {
    tracks,
    loading,
    setSelectedTrack,
    setShouldPlay,
    setTracks,
    page,
    tracksPerPage
  } = props;

  const handleTrackPlay = (event) => {
    const clickedTrackId = Number(event.target.name);
    const clickedTrack = tracks.find((track) => track.id === clickedTrackId);
    if (clickedTrack) {
      setSelectedTrack(clickedTrack);
      setShouldPlay(true);
    }
  };

  const handleDeleteTrack = async (event) => {
    const clickedTrackId = event.target.name;
    const response = await deleteTrack(clickedTrackId);
    if (response.status === 204) {
      const updatedTracks = await getTracks(page, tracksPerPage);
      setTracks(updatedTracks.tracks);
    }
  };

  return (
    <section className="tracklist-container">
      {!loading ? tracks.map((track, index) => {
        const { id, title, artist, isrc } = track;

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
              <button
                name={id}
                type="button"
                onClick={handleDeleteTrack}
              >
                <img
                  name={id}
                  className="icon icon-delete"
                  alt="icon to delete"
                  src={deleteIcon}
                />
              </button>
              <button
                name="edit"
                type="button"
              >
                <img
                  name="img-edit"
                  className="icon icon-edit"
                  alt="icon to edit"
                  src={editIcon}
                />
              </button>
              <button
                name="lyrics"
                type="button"
              >
                <img
                  name="img-lyrics"
                  className="icon icon-lyrics"
                  alt="icon to lyrics"
                  src={lyricsIcon}
                />
              </button>
            </div>
            <p className="track-isrc">{isrc}</p>
          </div>
        );
      }) : (
        <p className="loading">Loading</p>
      )}
    </section>
  );
};

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  setSelectedTrack: PropTypes.func.isRequired,
  setTracks: PropTypes.func.isRequired,
  setShouldPlay: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  tracksPerPage: PropTypes.number.isRequired
};

export default TrackList;
