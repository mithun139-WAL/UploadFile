/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter} from 'reactstrap';

function Cars() {
  const [cars, setCars] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [id, setId] = useState(null);
  const [color, setColor] = useState(null);
  const [stock, setStock] = useState(null);
  const toggle = () => setModal(!modal);
  const getCars = () => {
    axios
      .get('/carsmysql')
      .then((res) => {
        setCars(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCars();
  }, []);
  const addCar = (event) => {
    event.preventDefault();
    const categoryObj = {
      name: event.target.name.value,
      price: event.target.price.value,
      color: event.target.color.value,
      in_stock: event.target.stock.value,
    };
    axios.post('/carsmysql', categoryObj).then((res) => {
      getCars();
      console.log(res.data);
    });
  };
  const updateCar = () => {
    axios
      .put(`/carsmysql/${id}`, {
        id: id,
        name: name,
        price: price,
        color: color,
        in_stock: stock,
      })
      .then((res) => {
        console.log(res.data);
        getCars();
      });
  };
  const deleteCar = (cid) => {
    axios.delete(`/carsmysql/${cid}`).then((res) => {
      console.log(res.data);
      getCars();
    });
  };
  const deleteAll = () => {
    axios.delete('/carsmysql').then((res) => {
      console.log(res.data);
      getCars();
    });
  };
  return (
    <div className="container">
      <div className="col-lg-4 col-md-6 col-sm-10 mx-auto">
        <h1>Add Category</h1>
        <form onSubmit={addCar}>
          <input
            type="text"
            name="name"
            placeholder="Enter Car Name"
            className="form-control my-2"
          />
          <input
            type="number"
            name="price"
            placeholder="Enter Car Price"
            className="form-control my-2"
          />
          <select
            name="color"
            placeholder="Select Car color"
            className="form-control my-2"
          >
            <option value="black">Black</option>
            <option value="blue">Blue</option>
            <option value="grey">Grey</option>
          </select>
          <select
            name="stock"
            placeholder="In Stock"
            className="form-control my-2"
          >
            <option value="0">false</option>
            <option value="1">true</option>
          </select>
          <button type="submit">Add Car</button>
        </form>
      </div>
      <div className="text-center my-2">
        <h1>Cars List</h1>
        <button type="button" onClick={() => deleteAll()}>
          Delete all Cars
        </button>
        <table>
          <thead>
            <tr>
              <th>Car Id</th>
              <th>Car Name</th>
              <th>Price</th>
              <th>Color</th>
              <th>In Stock</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((val) => (
              <tr>
                <td>{val.id}</td>
                <td>{val.name}</td>
                <td>{val.price}</td>
                <td>{val.color}</td>
                <td>{val.in_stock}</td>
                <td>
                  <button type="button" onClick={toggle}>
                    Update
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => deleteCar(val.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modal} toggle={toggle} modalTransition={{timeout: 1000}}>
        <ModalBody>
          <h1 className="text-center">Update Car</h1>
          <div>
            <input
              type="number"
              name="carid"
              placeholder="Enter Car Id you want to update"
              className="form-control"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <input
              type="text"
              name="updateName"
              className="form-control my-3"
              placeholder="Enter Car Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="number"
              name="updateprice"
              className="form-control my-3"
              placeholder="Enter Car Price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <select
              name="color"
              placeholder="Select Car color"
              className="form-control my-2"
              onChange={(e) => {
                setColor(e.target.value);
              }}
            >
              <option value="black">Black</option>
              <option value="blue">Blue</option>
              <option value="grey">Grey</option>
            </select>
            <select
              name="color"
              placeholder="In Stock"
              className="form-control my-2"
              onChange={(e) => {
                setStock(e.target.value);
              }}
            >
              <option value="0">false</option>
              <option value="1">true</option>
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="submit" className="btn btn-info" onClick={updateCar}>
            Update
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default Cars;
