import React from 'react';
import PropTypes from 'prop-types';
import getTracks, { getArtist, createTrack, updateTrack } from '../api/beatroot-api';
import './css/trackform.css';

class TrackForm extends React.Component {
  constructor(props) {
    super(props);
    const { track } = props;
    this.state = { ...track, artist: track.artist.name };
    this.handleTextOnChange = this.handleTextOnChange.bind(this);
    this.handleExplicitOnChange = this.handleExplicitOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextOnChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleExplicitOnChange() {
    const { explicit } = this.state;
    this.setState({ explicit: !explicit });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { id, title, artist, explicit, isrc, lyrics } = this.state;
    const {
      setModalIsOpen,
      updateTrackList,
      setEditTrackModalOpen,
      page,
      tracksPerPage,
      setLoading
    } = this.props;

    // If we don't have id we are creating a new track
    if (!id && title && artist) {
      setLoading(true);
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
        const response = await getTracks(page, tracksPerPage);
        updateTrackList(response);
        setModalIsOpen(false);
      } else {
        alert('Artist not found, try a different one');
      }
      // If we have id we are editing
    } else if (id && title && artist) {
      setLoading(true);
      const artistNameQuery = artist.replace(' ', '+');
      const foundArtist = await getArtist(artistNameQuery);

      if (foundArtist) {
        const updatedTrack = {
          id,
          title,
          artist_id: foundArtist.id,
          explicit,
          isrc,
          lyrics
        };

        await updateTrack(updatedTrack);
        const response = await getTracks(page, tracksPerPage);
        updateTrackList(response);
        setEditTrackModalOpen(false);
      } else {
        alert('Artist not found, try a different one');
      }
    }
  }

  render() {
    const {
      title = '',
      artist = '',
      explicit = false,
      lyrics = '',
      isrc = ''
    } = this.state;

    return (
      <form className="track-form">
        <input
          type="text"
          className="text-input title-input"
          name="title"
          onChange={this.handleTextOnChange}
          value={String(title)}
          placeholder="Song title"
          required
        />
        <input
          type="text"
          className="text-input artist-input"
          name="artist"
          onChange={this.handleTextOnChange}
          value={String(artist)}
          placeholder="Artist name"
          required
        />
        <input
          type="text"
          className="text-input isrc-input"
          name="isrc"
          onChange={this.handleTextOnChange}
          value={String(isrc)}
          placeholder="ISRC"
        />
        <div className="explicit-input-container">
          <label htmlFor="explicit-checkbox">
            Explicit Song
            <input
              checked={explicit}
              type="checkbox"
              className="explicit-input"
              name="explicit"
              id="explicit-checkbox"
              onChange={this.handleExplicitOnChange}
              value={!!explicit}
            />
          </label>
        </div>
        <textarea
          type="text"
          className="lyrics-input"
          name="lyrics"
          onChange={this.handleTextOnChange}
          value={String(lyrics)}
          placeholder="Lyrics"
        />
        <button
          className="track-form-submit"
          type="submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </form>
    );
  }
}


TrackForm.propTypes = {
  track: PropTypes.object,
  setModalIsOpen: PropTypes.func,
  updateTrackList: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setEditTrackModalOpen: PropTypes.func,
  tracksPerPage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  page: PropTypes.number.isRequired
};

TrackForm.defaultProps = {
  track: {
    title: '',
    artist: { name: '' },
    explicit: false,
    isrc: '',
    lyrics: ''
  },
  setModalIsOpen: Function.prototype,
  setEditTrackModalOpen: Function.prototype
};

export default TrackForm;
