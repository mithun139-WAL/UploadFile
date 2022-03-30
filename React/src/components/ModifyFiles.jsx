/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable linebreak-style */
import axios from 'axios';
import {useState} from 'react';

export default function ModifyFile() {
  const [filename, setFilename] = useState();
  const [data, setData] = useState();
  const fetchData = (e) => {
    e.preventDefault();
    const filename = e.target.filename.value;
    setFilename(filename);
    axios
      .get(`/filemanagement/readfile/${filename}`)
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  };
  const modifyData = () => {
    axios
      .get(`/filemanagement/modifyfile/${filename}/${data}`)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };
  return (
    <div className="card col-lg-4 col-md-6 mx-auto my-5">
      <h1 className="text-center text-primary">Modify File contents</h1>
      <form onSubmit={fetchData}>
        <input
          required
          type="text"
          name="filename"
          placeholder="Enter File name.."
          className="form-control mt-5"
        />
        <div className="text-center my-5">
          <button className="btn btn-info" type="submit">
            Fetch Data
          </button>
        </div>
        <textarea
          className="form-control mt-4"
          name="content"
          placeholder="File content"
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </form>
      <div className="text-center my-5">
        <button className="btn btn-primary" type="submit" onClick={modifyData}>
          Modify File contents
        </button>
      </div>
    </div>
  );
}
