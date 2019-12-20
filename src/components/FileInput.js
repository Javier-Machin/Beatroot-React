import React from 'react';

const FileInput = props => {
  const { removeFile, onChange, file, title } = props;

  return (
    <div>
      <input type="file" onChange={onChange} />
      <span>Song file</span>
      <button type="button" className="file-preview" onClick={removeFile}>
        {file && title}
      </button>
    </div>
  );
};

export default FileInput;
