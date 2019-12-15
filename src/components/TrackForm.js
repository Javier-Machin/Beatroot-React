import React from 'react';
import PropTypes from 'prop-types';
import { getTracks, createTrack, updateTrack } from '../api/music-beast-api';
import FileInput from './FileInput';
import './css/trackform.css';

class TrackForm extends React.Component {
  constructor(props) {
    super(props);
    const { track } = props;
    this.state = { ...track, artist: track.artist.name };
    this.handleTextOnChange = this.handleTextOnChange.bind(this);
    this.handleExplicitOnChange = this.handleExplicitOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileOnChange = this.handleFileOnChange.bind(this);
    this.handleRemoveFile = this.handleRemoveFile.bind(this);
  }

  handleTextOnChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleExplicitOnChange() {
    const { explicit } = this.state;
    this.setState({ explicit: !explicit });
  }

  handleFileOnChange(event) {
    const { files } = event.target;
    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({ file: reader.result });
    };

    reader.readAsDataURL(files[0]);
  }

  handleRemoveFile() {
    this.setState({ file: '' });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { id, title, artist, explicit, lyrics, file } = this.state;
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

      const newTrack = {
        title,
        artist: {
          name: artist
        },
        explicit,
        lyrics,
        file
      };

      await createTrack(newTrack);
      const response = await getTracks(page, tracksPerPage);
      updateTrackList(response);
      setModalIsOpen(false);
      // If we have id we are editing
    } else if (id && title && artist) {
      setLoading(true);

      const updatedTrack = {
        id,
        title,
        artist: {
          name: artist
        },
        explicit,
        lyrics,
        file
      };

      await updateTrack(updatedTrack);
      const response = await getTracks(page, tracksPerPage);
      updateTrackList(response);
      setEditTrackModalOpen(false);
    }
  }

  render() {
    const {
      title = '',
      artist = '',
      explicit = false,
      lyrics = '',
      file = ''
    } = this.state;

    return (
      <form data-testid="track-form" className="track-form">
        <FileInput
          removeFile={this.handleRemoveFile}
          onChange={this.handleFileOnChange}
          file={file}
        />
        <input
          type="text"
          data-testid="title-input"
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
        <button className="track-form-submit" type="submit" onClick={this.handleSubmit}>
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
  tracksPerPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  page: PropTypes.number.isRequired
};

TrackForm.defaultProps = {
  track: {
    title: '',
    artist: { name: '' },
    explicit: false,
    file: '',
    isrc: '',
    lyrics: ''
  },
  setModalIsOpen: Function.prototype,
  setEditTrackModalOpen: Function.prototype
};

export default TrackForm;
