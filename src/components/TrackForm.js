import React from 'react';
import PropTypes from 'prop-types';
import './css/trackform.css';

class TrackForm extends React.Component {
  constructor(props) {
    super(props);
    const { track } = props;
    this.state = { ...track };
    this.handleTextOnChange = this.handleTextOnChange.bind(this);
  }

  handleTextOnChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event);
  }

  render() {
    const {
      title = '',
      artist = {},
      explicit = false,
      isrc = '',
      lyrics = ''
    } = this.state;
    const { name = '' } = artist;

    return (
      <form className="track-form">
        <input
          type="text"
          className="text-input title-input"
          name="title"
          onChange={this.handleTextOnChange}
          value={title}
          placeholder="Song title"
        />
        <input
          type="text"
          className="text-input name-input"
          name="name"
          onChange={this.handleTextOnChange}
          value={name}
          placeholder="Artist name"
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
  track: PropTypes.object
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
