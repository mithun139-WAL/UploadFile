/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable linebreak-style */
import {useState} from 'react';
import axios from 'axios';

export default function FileUpload() {
  const [file, setFile] = useState({preview: '', data: ''});
  const [status, setStatus] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file.data);
    const response = await fetch('http://localhost:5000/image', {
      method: 'POST',
      body: formData,
    });
    if (response) setStatus(response.statusText);
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFile(img);
  };
  return (
    <div className="container my-5 col-lg-4 col-md-6 mx-auto">
      <form onSubmit={handleSubmit}>
        <h1>Upload file</h1>
        {file.preview && (
          <img
            src={file.preview}
            className="mx-auto"
            width="200"
            height="200"
            alt=".."
          />
        )}
        <hr />
        <div className="form-group">
          <input
            className="form-control"
            type="file"
            name="file"
            onChange={handleFileChange}
          />
        </div>
        <div className="text-center mb-5">
          <button className="btn btn-primary" type="submit">
            Upload
          </button>
        </div>
      </form>

      {status && <h4>{status}</h4>}
    </div>
  );
}
