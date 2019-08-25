import React from 'react';
import PropTypes from 'prop-types';
import './css/tracklist.css';

const TrackList = props => {
  const { tracks } = props;

  return (
    <section className="tracklist-container">
      {tracks.map((track, index) => {
        const testId = `track-${index + 1}`;
        const uniqueKey = Date.now() + Math.random();
        return (
          <div
            className="track-container"
            data-testid={testId}
            key={uniqueKey}
          >
            <p>{track.title}</p>
            <p>{track.artist.name}</p>
            <p>{track.explicit}</p>
            <p>{track.isrc}</p>
            <p>{track.lyrics}</p>
          </div>
        );
      })}
    </section>
  );
};

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired
};

export default TrackList;
