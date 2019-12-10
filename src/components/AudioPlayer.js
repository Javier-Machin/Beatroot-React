import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import './css/audioplayer.css';

const AudioPlayer = props => {
  const [playing, setPlaying] = useState(false);
  const { track = {}, shouldPlay, setShouldPlay } = props;
  const { title = '- Welcome to Music Beast Manager', artist = {}, file = '' } = track;
  const { name = '' } = artist;

  const playerRef = React.createRef();

  // When a song with shouldPlay is provided, start from 0 seconds

  useEffect(() => {
    if (shouldPlay) {
      playerRef.current.seekTo(0);
      setPlaying(true);
      setShouldPlay(false);
    }
  }, [playerRef, shouldPlay, setShouldPlay]);

  return (
    <div className="audio-container">
      <div className="audio-display">
        <span data-testid="audio-display-text" className="audio-display-text">
          {`${title} - ${name}`}
        </span>
      </div>
      <ReactPlayer
        ref={playerRef}
        data-testid="audio-player"
        className="audio-player"
        width="300px"
        height="50px"
        url={file}
        controls
        playing={playing}
      />
    </div>
  );
};

AudioPlayer.propTypes = {
  track: PropTypes.object.isRequired,
  setShouldPlay: PropTypes.func.isRequired,
  shouldPlay: PropTypes.bool.isRequired
};

export default AudioPlayer;
