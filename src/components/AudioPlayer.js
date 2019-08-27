import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import song from '../assets/fearless-tule.mp3';
import './css/audio-player.css';

const AudioPlayer = (props) => {
  const [playing, setPlaying] = useState(false);
  const { track = {} } = props;
  const { title = '- Welcome to Beatroot Lite', artist = {} } = track;
  const { name = '' } = artist;

  const playerRef = React.createRef();

  // When a song is provided, start from 0 seconds

  useEffect(() => {
    playerRef.current.seekTo(0);
    if (name) setPlaying(true);
  }, [title, name, playerRef]);

  return (
    <div className="audio-container">
      <div className="audio-display">
        <span className="audio-display-text">{`${title} - ${name}`}</span>
      </div>
      <ReactPlayer
        ref={playerRef}
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
  track: PropTypes.object.isRequired
};

export default AudioPlayer;
