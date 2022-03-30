/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Author() {
  const [authors, setAuthors] = useState([]);
  const getAuthor = () => {
    axios
      .get('/authormysql')
      .then((res) => {
        setAuthors(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAuthor();
  }, []);
  const addAuthor = (event) => {
    event.preventDefault();
    const authorObj = {
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      dob: event.target.dob.value,
      dod: event.target.dod.value,
    };
    axios.post('/authormysql', authorObj).then((res) => {
      getAuthor();
      console.log(res.data);
    });
  };
  const deleteTodo = (id) => {
    axios.delete(`/authormysql/${id}`).then((res) => {
      console.log(res.data);
      getAuthor();
    });
  };
  const deleteAll = () => {
    axios.delete('/authormysql').then((res) => {
      console.log(res.data);
      getAuthor();
    });
  };
  return (
    <div className="container">
      <div className="col-lg-4 col-md-6 col-sm-10 mx-auto">
        <h1>Add Author</h1>
        <form onSubmit={addAuthor}>
          <input
            type="text"
            name="first_name"
            placeholder="Enter first name"
            className="form-control"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Enter Last name"
            className="form-control"
          />
          <div>
            <label>Date of Birth:</label>
          </div>
          <input type="date" name="dob" className="form-control" />
          <div>
            <label>Date of Death:</label>
          </div>
          <input type="date" name="dod" className="form-control" />
          <button type="submit">Add Author</button>
        </form>
      </div>
      <div className="text-center">
        <h1>Authors List</h1>
        <button type="button" onClick={() => deleteAll()}>
          Delete all Authors
        </button>
        <table>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Date of Birth</th>
              <th>Date of Death</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((val) => (
              <tr>
                <td>{val.first_name}</td>
                <td>{val.last_name}</td>
                <td>{val.dob}</td>
                <td>{val.dod}</td>
                <td>
                  <button type="button" onClick={() => deleteTodo(val.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Author;
