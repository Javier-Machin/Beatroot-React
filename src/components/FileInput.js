import React from 'react';
import './css/fileinput.css';
import closeIcon from '../assets/delete.png';

const FileInput = props => {
  const { removeFile, onChange, file, title } = props;

  return (
    <div className="input-container">
      <input
        type="file"
        name="file"
        id="file"
        className="upload"
        onChange={onChange}
      />
      <label htmlFor="file">Upload audio</label>
      {file && title && (
        <button type="button" className="delete-file-btn" onClick={removeFile}>
          {'Delete current audio'}
          <img
            className="icon icon-delete"
            alt="close modal icon"
            src={closeIcon}
          />
        </button>
      )}
    </div>
  );
};

export default FileInput;
