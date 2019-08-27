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
          name="title"
          onChange={this.handleTextOnChange}
          value={title}
        />
        <input
          type="text"
          name="name"
          onChange={this.handleTextOnChange}
          value={name}
        />
        <input
          type="checkbox"
          name="explicit"
          onChange={Function.prototype}
          value={explicit}
        />
        <input
          type="text"
          name="isrc"
          onChange={this.handleTextOnChange}
          value={isrc}
        />
        <textarea
          type="text"
          name="lyrics"
          onChange={this.handleTextOnChange}
          value={lyrics}
        />
      </form>
    );
  }
}


TrackForm.propTypes = {
  track: PropTypes.object.isRequired
};

export default TrackForm;
