/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function User() {
  const [users, setUsers] = useState([]);
  const getUsers = () => {
    axios
      .get('/usersmysql')
      .then((res) => {
        setUsers(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);
  const addUser = (event) => {
    event.preventDefault();
    const dishObj = {
      email: event.target.email.value,
      password: event.target.password.value,
      user_info: event.target.user_info.value,
      dob: event.target.dob.value,
    };
    axios.post('/usersmysql', dishObj).then((res) => {
      getUsers();
      console.log(res.data);
    });
  };
  const deleteUser = (id) => {
    axios.delete(`/usersmysql/${id}`).then((res) => {
      console.log(res.data);
      getUsers();
    });
  };
  const deleteAll = () => {
    axios.delete('/usersmysql').then((res) => {
      console.log(res.data);
      getUsers();
    });
  };
  return (
    <div className="container">
      <div className="col-lg-4 col-md-6 col-sm-10 mx-auto">
        <h1>Add Author</h1>
        <form onSubmit={addUser}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Id"
            className="form-control"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password "
            className="form-control"
          />
          <textarea
            name="user_info"
            cols="30"
            rows="10"
            className="form-control"
          >
            Enter User info....
          </textarea>
          <div>
            <label>Date of Birth:</label>
          </div>
          <input type="date" name="dob" className="form-control" />
          <button type="submit">Add User</button>
        </form>
      </div>
      <div className="text-center">
        <h1>Users List</h1>
        <button type="button" onClick={() => deleteAll()}>
          Delete all Users
        </button>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Password</th>
              <th>User Info</th>
              <th>Date of Birth</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((val) => (
              <tr>
                <td>{val.email}</td>
                <td>{val.password}</td>
                <td>{val.user_info}</td>
                <td>{val.dob}</td>
                <td>
                  <button type="button" onClick={() => deleteUser(val.id)}>
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
export default User;
