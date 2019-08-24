import React from 'react';

const TrackList = props => {
  const { tracks } = props;

  return tracks.map(track => (
    <div key={Date.now() + Math.random()}>
      <p>{track.title}</p>
      <p>{track.artist.name}</p>
      <p>{track.explicit}</p>
      <p>{track.isrc}</p>
      <p>{track.lyrics}</p>
    </div>
  ));
};

export default TrackList;
