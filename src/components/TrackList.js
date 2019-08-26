import React from 'react';
import PropTypes from 'prop-types';
import trackImage from '../assets/track.png';
import deleteIcon from '../assets/delete.png';
import editIcon from '../assets/edit.png';
import lyricsIcon from '../assets/lyrics.png';
import explicitIcon from '../assets/explicit.png';
import './css/tracklist.css';

const TrackList = props => {
  const { tracks, loading } = props;

  return (
    <section className="tracklist-container">
      {!loading ? tracks.map((track, index) => {
        const { title, artist, explicit = true, isrc, lyrics = 'some lyrics' } = track;
        const testId = `track-${index + 1}`;
        const uniqueKey = Date.now() + Math.random() + index;
        return (
          <div
            className="track-container"
            data-testid={testId}
            key={uniqueKey}
          >
            <img className="track-image" alt="track cover art" src={trackImage} />
            <div className="track-title-container">
              <p className="track-title">{title}</p>
              <p className="track-artist">{artist.name}</p>
            </div>
            <div className="track-icons-container">
              <button
                name="delete"
                type="button"
              >
                <img
                  name="img-delete"
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
              {!!lyrics && (
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
              )}
              {!!explicit && (
                <img
                  className="icon icon-explicit"
                  alt="18 plus icon"
                  src={explicitIcon}
                />
              )}
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
  loading: PropTypes.bool.isRequired
};

export default TrackList;
