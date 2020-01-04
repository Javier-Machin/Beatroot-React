import React from 'react';
import PropTypes from 'prop-types';
import './css/lyrics.css';

const Lyrics = props => {
  const { title, artist } = props;
  let { selectedLyrics } = props;

  if (!selectedLyrics || typeof selectedLyrics !== 'string') {
    selectedLyrics = 'No lyrics available for this song';
  }

  return (
    <div className="lyrics-container">
      <h3>{title}</h3>
      <h3>{artist}</h3>
      <textarea
        className="lyrics-textarea"
        data-testid="lyrics-textarea"
        readOnly
        value={selectedLyrics}
      />
    </div>
  );
};

Lyrics.propTypes = {
  selectedLyrics: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.string,
  artist: PropTypes.string,
};

Lyrics.defaultProps = {
  selectedLyrics: 'No lyrics available for this song',
  title: '',
  artist: '',
};

export default Lyrics;
