/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function City() {
  const [city, setCity] = useState([]);
  const getCity = () => {
    axios
      .get('/citycookie/viewcookies')
      .then((res) => {
        setCity(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCity();
  }, []);
  const addCity = (event) => {
    event.preventDefault();
    axios
      .get(
        `/citycookie/setcookie/${event.target.user.value}/${event.target.city.value}`
      )
      .then((res) => {
        getCity();
        console.log(res.data);
      });
  };

  return (
    <div className="container">
      <div className="col-lg-4 col-md-6 col-sm-10 mx-auto">
        <h1>Add Author</h1>
        <form onSubmit={addCity}>
          <input
            type="text"
            name="user"
            placeholder="Enter User"
            className="form-control"
          />
          <input
            type="text"
            name="city"
            placeholder="Enter City name"
            className="form-control"
          />
          <button type="submit">Set City</button>
        </form>
      </div>
      {/* <div className="text-center">
        <h1>Cities List</h1>
        <ul className="list-group">
          {city.map((val) => (
            <li className="list-item">{val.city}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
export default City;
