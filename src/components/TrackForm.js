import React from 'react';
import PropTypes from 'prop-types';

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

TrackForm.propTypes = {
  track: PropTypes.object.isRequired
};

export default TrackForm;
