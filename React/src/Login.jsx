/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable linebreak-style */
/* eslint-disable react/function-component-definition */
import axios from 'axios';
import {useState} from 'react';

const Login = () => {
  const [data, setData] = useState();
  const checkLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    axios
      .get(`/usermysql/checklogin/${username}/${password}`)
      .then((res) => setData(JSON.stringify(res.data)))
      .catch((event) => console.log(event));
  };
  const showCurrentUserDetails = () => {
    setData('Login with valid Credentials');
    axios
      .get('/checkloginmysql')
      .then((res) => {
        setData(JSON.stringify(res.data.results[0]));
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="text-center my-3">
      {data}
      <form
        className="card col-lg-4 col-md-6 mx-auto text-center"
        onSubmit={checkLogin}
      >
        <h1>Login</h1>
        <input
          tye="text"
          name="username"
          placeholder="username.."
          className="form-control"
        />
        <input
          name="password"
          type="password"
          placeholder="enter password.."
          className="form-control"
        />
        <div className="text-center">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
      </form>
      <div className="col-lg-6 col-md-8 mx-auto my-5">
        <button
          className="btn btn-info"
          type="submit"
          onClick={showCurrentUserDetails}
        >
          show user details
        </button>
      </div>
    </div>
  );
};
export default Login;
