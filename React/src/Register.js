/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable linebreak-style */
/* eslint-disable react/function-component-definition */
import axios from 'axios';

const Register = () => {
  const addUser = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    axios
      .post('/usermysql', {username, password})
      .then((res) => console.log(res.data))
      .catch((event) => console.log(event));
  };
  return (
    <div>
      <form
        className="card col-lg-4 col-md-6 mx-auto text-center"
        onSubmit={addUser}
      >
        <h1>Register</h1>
        <input
          type="text"
          name="username"
          className="form-control"
          placeholder="username.."
        />
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="password.."
        />
        <div className="text-center">
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
