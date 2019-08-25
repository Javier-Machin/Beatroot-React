import React from 'react';

const TrackForm = props => {
  const { track } = props;
  const { title, artist, explicit, isrc, lyrics } = track;

  return (
    <form className="track-form">
      <input />
      <input />
      <input />
      <input />
      <input />
    </form>
  );
};

export default TrackForm;
