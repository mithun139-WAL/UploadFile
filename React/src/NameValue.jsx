/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function NameValue() {
  const addCity = (event) => {
    event.preventDefault();
    axios
      .get(
        `/cookie/setcookiewithtime/${event.target.name.value}/${event.target.val.value}/${event.target.time.value}`
      )
      .then((res) => {
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
            name="name"
            placeholder="Enter Name to be Expired"
            className="form-control"
          />
          <input
            type="text"
            name="val"
            placeholder="Enter Value"
            className="form-control"
          />
          <input
            type="number"
            name="time"
            placeholder="Enter Time"
            className="form-control"
          />
          <button type="submit">Expire</button>
        </form>
      </div>
    </div>
  );
}
export default NameValue;
