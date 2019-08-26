import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import song from '../assets/fearless-tule.mp3';
import './css/audio-player.css';

const AudioPlayer = (props) => {
  const { songName = 'Welcome to Beatroot lite', playing = false } = props;

  let player;
  const ref = playerRef => {
    player = playerRef;
  };

  // On song change start from 0 seconds
  useEffect(() => {
    player.seekTo(0);
  }, [songName]);

  return (
    <div className="audio-container">
      <div className="audio-display">
        <span className="audio-display-text">{songName}</span>
      </div>
      <ReactPlayer
        ref={ref}
        className="audio-player"
        width="300px"
        height="50px"
        url={song}
        controls
        playing={playing}
      />
    </div>
  );
};

AudioPlayer.propTypes = {
  songName: PropTypes.string.isRequired,
  playing: PropTypes.bool.isRequired
};

export default AudioPlayer;
