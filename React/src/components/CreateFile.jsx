/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable linebreak-style */
import axios from 'axios';

export default function CreateFile() {
  const createFile = (event) => {
    event.preventDefault();
    const filename = event.target.filename.value;
    const filecontent = event.target.filecontent.value;
    axios
      .get(`/filemanagement/createfile/${filename}/${filecontent}`)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
    event.target.filename.value = null;
    event.target.filecontent.value = null;
  };
  return (
    <div className="card col-lg-4 col-md-6 mx-auto my-5">
      <h2 className="text-center text-primary">Create File</h2>
      <form onSubmit={createFile}>
        <input
          type="text"
          name="filename"
          className="form-control mt-5"
          placeholder="Enter filename.."
          required
        />
        <textarea
          name="filecontent"
          className="form-control mt-5"
          placeholder="Enter file content....."
          required
        />
        <div className="text-center">
          <button
            className="btn btn-primary my-5 col-lg-6 col-md-8"
            type="submit"
          >
            Create File
          </button>
        </div>
      </form>
    </div>
  );
}
