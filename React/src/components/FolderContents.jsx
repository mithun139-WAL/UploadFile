/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable linebreak-style */
import axios from 'axios';
import {useEffect, useState} from 'react';
import '../App.css';

export default function FolderContents() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get('/filemanagement/foldercontents')
      .then((res) => setContent(res.data))
      .catch((e) => console.log(e));
  }, []);
  function getData() {
    axios
      .get('/filemanagement/foldercontents')
      .then((res) => setContent(res.data))
      .catch((e) => console.log(e));
  }
  function deleteFile(val) {
    axios
      .get(`/filemanagement/deletefile/${val}`)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
    getData();
  }

  return (
    <div className="col-lg-6 col-md-8 mx-auto my-5">
      <h1>Folder Contents</h1>
      <table className="w-100 mx-auto text-center my-5">
        <thead>
          <tr>
            <th>File</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {content.map((val) => {
            return (
              <tr>
                <td>{val}</td>
                <td>
                  <button
                    type="submit"
                    className="btn btn-warning"
                    onClick={() => deleteFile(val)}
                  >
                    Delete File
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
