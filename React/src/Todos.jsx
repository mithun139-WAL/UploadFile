/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Todos() {
  const [todos, setTodos] = useState([]);
  const getTodos = () => {
    axios
      .get('/todosmysql')
      .then((res) => {
        setTodos(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTodos();
  }, []);
  const addTodo = (event) => {
    event.preventDefault();
    const obj = {
      item: event.target.item.value,
      status: event.target.status.value,
    };
    axios.post('/todosmysql', obj).then((res) => {
      getTodos();
      console.log(res.data);
    });
  };
  const deleteTodo = (id) => {
    axios.delete(`/todosmysql/${id}`).then((res) => {
      console.log(res.data);
      getTodos();
    });
  };
  const deleteAll = () => {
    axios.delete('/todosmysql').then((res) => {
      console.log(res.data);
      getTodos();
    });
  };

  return (
    <div className="container-fluid">
      <div className="col-lg-4 col-md-6 col-sm-10 mx-auto">
        <h1>Add Todo</h1>
        <form onSubmit={addTodo}>
          <input
            type="text"
            name="item"
            placeholder="Enter Todo"
            className="form-control"
          />
          <br />
          <select name="status" className="form-control">
            <option value="Complete">Complete</option>
            <option value="Incomplete">Incomplete</option>
          </select>
          <button type="submit">Add Todo</button>
        </form>
      </div>

      <div className="text-center">
        <h1>Todos List</h1>
        <button type="button" onClick={() => deleteAll()}>
          Delete all Todos
        </button>
        <table>
          <thead>
            <tr>
              <th>Todo</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((val) => (
              <tr>
                <td>{val.item}</td>
                <td>{val.status}</td>
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
export default Todos;
