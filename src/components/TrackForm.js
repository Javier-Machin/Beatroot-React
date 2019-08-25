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
  track: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.object.isRequired,
  explicit: PropTypes.bool,
  isrc: PropTypes.string,
  lyrics: PropTypes.string
};

TrackForm.defaultProps = {
  explicit: null,
  isrc: '',
  lyrics: ''
};

export default TrackForm;
