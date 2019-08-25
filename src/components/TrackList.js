import React from 'react';

const TrackList = props => {
  const { tracks } = props;

  return tracks.map((track, index) => {
    const testId = `track-${index + 1}`;
    const uniqueKey = Date.now() + Math.random();

    return (
      <div data-testid={testId} key={uniqueKey}>
        <p>{track.title}</p>
        <p>{track.artist.name}</p>
        <p>{track.explicit}</p>
        <p>{track.isrc}</p>
        <p>{track.lyrics}</p>
      </div>
    );
  });
};

export default TrackList;
