/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable linebreak-style */
import React from 'react';
import axios from 'axios';

export default function CreateFolder() {
  const createFolder = (event) => {
    event.preventDefault();
    const foldername = event.target.foldername.value;
    axios
      .get(`/filemanagement/createfolder/${foldername}`)
      .then((res) => console.log(res))
      .catch((event) => console.log(event));
  };
  return (
    <div className="card col-lg-4 col-md-6 mx-auto my-5">
      <h2 className="text-center text-primary">Create Folder</h2>
      <form onSubmit={createFolder}>
        <input
          type="text"
          name="foldername"
          className="form-control mt-5"
          placeholder="Enter Folder name.."
          required
        />
        <div className="text-center">
          <button
            className="btn btn-primary my-5 col-lg-6 col-md-8"
            type="submit"
          >
            Create Folder
          </button>
        </div>
      </form>
    </div>
  );
}
