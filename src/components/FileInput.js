import React from 'react';

const FileInput = props => {
  const { removeFile, onChange, file } = props;

  return (
    <div>
      <input type="file" onChange={onChange} />
      <span>Song file</span>
      <button type="button" className="file-preview" onClick={removeFile}>
        {file && file.name}
      </button>
    </div>
  );
};

export default FileInput;
