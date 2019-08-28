import React from 'react';
import PropTypes from 'prop-types';
import { getArtist, createTrack } from '../api/beatroot-api';
import './css/trackform.css';

class TrackForm extends React.Component {
  constructor(props) {
    super(props);
    const { track } = props;
    this.state = { ...track, artist: track.artist.name };
    this.handleTextOnChange = this.handleTextOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextOnChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { id, title, artist, explicit, isrc, lyrics } = this.state;
    const { setModalIsOpen } = this.props;
    if (!id && title && artist) {
      const artistNameQuery = artist.replace(' ', '+');
      const foundArtist = await getArtist(artistNameQuery);

      if (foundArtist) {
        const newTrack = {
          title,
          artist_id: foundArtist.id,
          explicit,
          isrc,
          lyrics
        };

        await createTrack(newTrack);
        setModalIsOpen(false);
      }
    }
  }

  render() {
    const {
      title = '',
      artist = '',
      explicit = false,
      isrc = '',
      lyrics = ''
    } = this.state;

    return (
      <form className="track-form">
        <input
          type="text"
          className="text-input title-input"
          name="title"
          onChange={this.handleTextOnChange}
          value={title}
          placeholder="Song title"
          required
        />
        <input
          type="text"
          className="text-input artist-input"
          name="artist"
          onChange={this.handleTextOnChange}
          value={artist}
          placeholder="Artist name"
          required
        />
        <input
          type="text"
          className="text-input isrc-input"
          name="isrc"
          onChange={this.handleTextOnChange}
          value={isrc}
          placeholder="ISRC"
        />
        <div className="explicit-input-container">
          <label htmlFor="explicit-checkbox">
            Explicit Song
            <input
              type="checkbox"
              className="explicit-input"
              name="explicit"
              id="explicit-checkbox"
              onChange={Function.prototype}
              value={explicit}
            />
          </label>
        </div>
        <textarea
          type="text"
          className="lyrics-input"
          name="lyrics"
          onChange={this.handleTextOnChange}
          value={lyrics}
          placeholder="Lyrics"
        />
        <button className="track-form-submit" type="submit" onClick={this.handleSubmit}> Submit </button>
      </form>
    );
  }
}


TrackForm.propTypes = {
  track: PropTypes.object,
  setModalIsOpen: PropTypes.func.isRequired
};

TrackForm.defaultProps = {
  track: {
    title: '',
    artist: { name: '' },
    explicit: false,
    isrc: '',
    lyrics: ''
  }
};

export default TrackForm;
